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
if DATABASE_URL.startswith("sqlite:///"):
    sqlite_path = DATABASE_URL.replace("sqlite:///", "", 1)
    dir_name = os.path.dirname(sqlite_path)
    if dir_name:
        try:
            if (dir_name in ["backend", "./backend", ".\\backend"]) and not os.path.exists(dir_name):
                db_filename = os.path.basename(sqlite_path)
                DATABASE_URL = f"sqlite:///{db_filename}"
            else:
                os.makedirs(dir_name, exist_ok=True)
        except Exception as e:
            print(f"⚠ Could not ensure database directory exists: {e}")

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
