from styletransfer import makeit
from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash, jsonify
import time
import json
app = Flask(__name__)


@app.route('/pred', methods=['GET', 'POST'])
def pred():

    try:
        data = request.get_data()
        json_re = json.loads(data)
        print(json_re)
        result = makeit(json_re['pic'], json_re['pic_match'], json_re['pic_map'])
        print(result)
    except Exception as e:
        return jsonify(results={"result": None})

    return jsonify(results={"result": result})


@app.route('/')
def main():
    return render_template('index.html')

@app.route('/dd.html/')
def dd():
    return render_template('dd.html')




if __name__ == '__main__':
    app.run(debug=True)