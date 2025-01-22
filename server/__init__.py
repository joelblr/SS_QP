from flask import Flask
from flask_cors import CORS
from server.pdf_upload import Upload_Route


def create_server():
    server = Flask(__name__)
    # Enable CORS for all routes and all origins
    CORS(server)
    # CORS(app, resources={r"/pdf_upload": {"origins": "http://localhost:3000"}})
    server.register_blueprint(Upload_Route.upload_router, url_prefix="/pdf_upload")


    return server