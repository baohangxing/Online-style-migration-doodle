from styletransfer import makeit
from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash, jsonify
import time
import json
import base64
import os

app = Flask(__name__)

# @app.route('/pred', methods=['GET', 'POST'])
# def pred():
#
#     try:
#         data = request.get_data()
#         json_re = json.loads(data)
#         print(json_re)
#         result = makeit(json_re['pic'], json_re['pic_match'], json_re['pic_map'])
#         print(result)
#     except Exception as e:
#         return jsonify(results={"result": None})
#
#     return jsonify(results={"result": result})

pic_path = ""
pic_match_path = ""
pic_map_path = ""

def clearpic():
    global pic_path
    global pic_map_path
    global pic_match_path
    pic_path = ""
    pic_match_path = ""
    pic_map_path = ""

@app.route('/isready', methods=['GET'])
def isready():
    global pic_path
    global pic_map_path
    global pic_match_path
    if pic_map_path != "" and pic_map_path != "" and pic_path != "":
        return jsonify(results={"isready": "ok"})
    else:
        return jsonify(results={"isready": "no"})

@app.route('/upload', methods=['POST'])
def upload():
    try:
        global pic_path
        global pic_map_path
        global pic_match_path
        recv_data = request.get_json()
        if recv_data is None:
            recv_data = request.get_data()
        json_re = json.loads(recv_data)
        print(json_re)
        imgRes = json_re['img']
        cav = json_re['cav']
        imgdata = base64.b64decode(imgRes)
        filename = r'.\static\input' + '\input_{}.png'.format(time.time())
        file = open(filename, "wb")
        print("上传" + cav + "图片ok...." + "文件保存地址：" + filename)

        if cav == "cavs":
            pic_map_path = filename
        elif cav == "cavs2":
            pic_match_path = filename
        elif cav == "pic":
            pic_path = filename

        print("pic_path:           " + pic_path)
        print(" pic_map_path:      " + pic_map_path)
        print("pic_match_path:     " + pic_match_path)


        file.write(imgdata)
        file.close()
        return jsonify(results={"result": "ok", "massage": "上传成功"})
    except Exception as e:
        return jsonify(results={"result": None, "massage": "上传失败"})


@app.route('/pred', methods=['GET'])
def pred():
    global pic_path
    global pic_map_path
    global pic_match_path

    if pic_map_path != "" and pic_map_path != "" and pic_path != "":
        try:
            base = makeit(pic_path, pic_map_path, pic_match_path)
            return jsonify(results={"result": "ok", "base": base})
        except Exception as e:
            return jsonify(results={"result": None})
    else:
        return jsonify(results={"result": None})

@app.route('/')
def main():
    return render_template('index.html')


@app.route('/start2.html/')
def dd():
    return render_template('start2.html')


if __name__ == '__main__':
    app.run(debug=True)
