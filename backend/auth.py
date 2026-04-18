from datetime import datetime, timedelta
from typing import Optional
import os
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import User

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# --- Pydantic Schemas ---
class UserRegister(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    email: str
    name: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# --- Password Hashing Functions ---
def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)


# --- JWT Token Functions ---
def create_access_token(user_id: int, email: str, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    if expires_delta is None:
        expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    expire = datetime.utcnow() + expires_delta
    to_encode = {"sub": str(user_id), "email": email, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> Optional[dict]:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        if user_id is None or email is None:
            return None
        return {"user_id": int(user_id), "email": email}
    except JWTError:
        return None


# --- Database Functions ---
def register_user(db: Session, user_data: UserRegister) -> Optional[User]:
    """Register a new user in the database."""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        return None
    
    # Create new user
    hashed_password = hash_password(user_data.password)
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        phone=user_data.phone,
        password_hash=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Authenticate a user by email and password."""
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        return None
    return user


def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Get a user by ID."""
    return db.query(User).filter(User.id == user_id).first()
