from flask import Flask, render_template
from flask import request
app = Flask(__name__)
from Simulator import Norm, Uniform,Gamma

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/test',methods = ['POST'])
def test():
    ParaA = float(request.form['ParaA'])
    ParaB = float(request.form['ParaB'])
    Type = request.form['Type']
    if Type == 'Normal':
        x,y,TimeC = Norm(ParaA, ParaB)
    elif Type == 'Uniform':
        x,y,TimeC = Uniform(ParaA, ParaB)
    elif Type == 'Gamma':
        x,y,TimeC = Gamma(ParaA, ParaB)
    response = {'x': x, 'y':y, 'time':round(TimeC*1000,2)}
    return response

if __name__ =="__main__":
    app.run(host='0.0.0.0',port=5000,debug = True)