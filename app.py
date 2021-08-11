import time
import uuid

from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy

# LOAD MODEL
app = Flask(__name__)


@app.route('/')
def index():
    return send_from_directory('static', 'music2pic.html')

@app.route('/add', methods=['POST'])
def add_image_music():
    # name = request.params.get('name')
    print(request.files)
    image = request.files.get('upload-image')
    music = request.files.get('upload-music')
    
    preview_filename =  'static/preview/' + str(uuid.uuid1()) + '.' + image.filename.split('.')[-1]
    filename = 'static/images/' + str(uuid.uuid1()) + '.' + image.filename.split('.')[-1]
    image.save(preview_filename)

    music_filename = 'static/music/' + str(uuid.uuid1()) + '.mp3'
    music.save(music_filename)

    # ...
    # read (music_filename)
    # read (preview_filename) -> process  -> save (filename)
    # ...

    return jsonify({'code': 0, 'msg': 'Success', 'image_url': filename, 'preview_url': preview_filename})


# @app.route('/view')
# def view_groceries():
#     all_items = Grocery.query.all()
#     all_names = [i.name for i in all_items]
#     response = '<ul>'
#     for name in all_names:
#         response += f'<li>{name}</li>'
#     response += '</ul>'
#     return response

app.run(host='127.0.0.1', port=8000)