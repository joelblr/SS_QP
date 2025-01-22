from flask import Blueprint, request, jsonify
import os


UPLOAD_FOLDER = "./.uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
upload_router = Blueprint("acc_router", __name__, static_folder="static", template_folder="templates")


@upload_router.route('', methods=['POST'])
def upload_files():
    if 'pdf_files' not in request.files:
        return jsonify({"message": "No files uploaded"}), 400

    files = request.files.getlist('pdf_files')
    saved_files = []

    for file in files:
        if file.filename.endswith('.pdf'):
            filepath = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(filepath)
            saved_files.append(file.filename)
        else:
            return jsonify({"message": "Only PDF files are allowed"}), 400

    return jsonify({"message": "Files uploaded successfully!"}), 200


# if __name__ == '__main__':
#     upload_router.run(debug=True)
