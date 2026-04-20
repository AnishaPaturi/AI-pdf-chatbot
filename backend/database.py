from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models import Base
import os

# SQLite database URL - stores the database file in the backend directory
db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "documind.db")
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{db_path}")

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
