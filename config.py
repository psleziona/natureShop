import os

class Config:
    SECRET_KEY = 'f'
    SQLALCHEMY_DATABASE_URI = 'postgresql://pi:pi@172.28.0.1:5432/nature'
    SQLALCHEMY_TRACK_MODIFICATIONS = False 