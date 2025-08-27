## PREFIX: /api/docword

from flask import Blueprint, request, jsonify
import os


UPLOAD_FOLDER = "./.uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
upload_router = Blueprint("acc_router", __name__, static_folder="static", template_folder="templates")


#TODO: add try-except For Errors
@upload_router.route("/pdf-uploads", methods=["GET", "POST", "DELETE"])
def upload_files():

    if request.method == "GET":
        if not os.path.exists(UPLOAD_FOLDER):
            return jsonify({
                "docs_info": {},
                "message": "Upload Files to Preview."
            }), 204

        # Return the list of uploaded files and their statuses
        pdocs = {}
        for filename in os.listdir(UPLOAD_FOLDER):
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            if os.path.isfile(file_path):
                status = "Pending"

                size_bytes = os.path.getsize(file_path)
                size_kb = size_bytes / 1024

                size = f"{size_kb:.2f} KB"
                if size_kb > 999:
                    size = f"{size_kb / 1024:.2f} MB"

                pdocs[filename] = {
                    "name": filename,
                    "size": size,
                    "status": status
                }

        return jsonify({
            "docs_info": pdocs,
            "message": "Successfully fetched uploaded pdf-files."
        }), 200


    elif request.method == "POST":
        if "pdf_files" not in request.files:
            return jsonify({"message": "No files uploaded"}), 400

        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        files = request.files.getlist("pdf_files")
        saved_files, duplicate_files = [], []

        for file in files:
            if file.filename.endswith(".pdf"):
                filepath = os.path.join(UPLOAD_FOLDER, file.filename)
                if os.path.exists(filepath):
                    duplicate_files.append(file.filename)
                else:
                    file.save(filepath)
                    saved_files.append(file.filename)
            else:
                return jsonify({ "message": "Only PDF files are allowed" }), 400

        return jsonify({
            "message": "Files uploaded successfully!",
            "saved_files": saved_files,
            "duplicate_files": duplicate_files
        }), 200

    elif request.method == "DELETE":
        return jsonify({ "message": "Successfully!" }), 200

    return jsonify({ "error": "Bad URL!" }), 500



# if __name__ == "__main__":
#     upload_router.run(debug=True)
