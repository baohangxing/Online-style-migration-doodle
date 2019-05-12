from flask import Flask, request, Response
import numpy as np
import json

app = Flask(__name__)


@app.route('/api/test', methods = ['POST'])
def test():
    r = request.json
    r_json = json.loads(r)
    data = r_json['data']
    numpy_data = np.asarray(data)
    response = {'message': 'Data type:{},Shape:{}'.format(type(numpy_data), numpy_data.shape)}
    response_pickled = json.dumps(response)
    return Response(response=response_pickled, status=200, mimetype="application/json")


# start flask app
app.run()