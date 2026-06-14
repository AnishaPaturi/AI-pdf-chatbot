from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models import Base
import os

# SQLite database URL - stores the database file in the backend directory
db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "documind.db")
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{db_path}")

# Fix Render/Heroku postgres URL format (replace postgres:// with postgresql://)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Fix SQLite paths that reference non-existent directories (e.g. backend/ from inside backend/)
if DATABASE_URL.startswith("sqlite://"):
    temp_path = DATABASE_URL.replace("sqlite://", "", 1)
    slashes_count = len(temp_path) - len(temp_path.lstrip('/'))
    sqlite_path = temp_path.lstrip('/')
    is_absolute = (slashes_count >= 2) or (len(sqlite_path) > 1 and sqlite_path[1] == ':')
    
    dir_name = os.path.dirname(sqlite_path)
    if dir_name:
        try:
            norm_path = os.path.normpath(sqlite_path)
            path_segments = [seg for seg in norm_path.split(os.sep) if seg.strip()]
            
            if path_segments and path_segments[0] == "backend" and not os.path.exists("backend"):
                new_path = os.sep.join(path_segments[1:])
                slashes = "////" if is_absolute else "///"
                DATABASE_URL = f"sqlite:{slashes}{new_path}"
            else:
                os.makedirs(dir_name, exist_ok=True)
        except Exception as e:
            print(f"⚠ Could not ensure database directory exists: {e}")

# Diagnostics for SQLite operational errors
if DATABASE_URL.startswith("sqlite"):
    try:
        clean_url = DATABASE_URL
        if clean_url.startswith("sqlite:///"):
            db_file_path = clean_url.replace("sqlite:///", "", 1)
        elif clean_url.startswith("sqlite://"):
            db_file_path = clean_url.replace("sqlite://", "", 1)
        else:
            db_file_path = clean_url.replace("sqlite:", "", 1)
            
        abs_db_path = os.path.abspath(db_file_path)
        db_dir = os.path.dirname(abs_db_path)
        
        print("=== DATABASE DIAGNOSTICS ===")
        print(f"Current Working Directory: {os.getcwd()}")
        print(f"DATABASE_URL: {DATABASE_URL}")
        print(f"Target Database File: {abs_db_path}")
        print(f"Target Directory: {db_dir}")
        print(f"Directory Exists: {os.path.exists(db_dir)}")
        if os.path.exists(db_dir):
            print(f"Directory Writable: {os.access(db_dir, os.W_OK)}")
        print(f"Database File Exists: {os.path.exists(abs_db_path)}")
        if os.path.exists(abs_db_path):
            print(f"Database File Writable: {os.access(abs_db_path, os.W_OK)}")
        print("============================")
    except Exception as diag_err:
        print(f"⚠ Diagnostics error: {diag_err}")

# Create the SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    echo=False
)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    """Initialize the database by creating all tables."""
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Database init error: {e}")
        raise


def get_db():
    """Dependency injection function for getting database sessions in FastAPI endpoints."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
