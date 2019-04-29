from flask import Flask
app = Flask(__name__)

from holes_to_mp import holes_to_mp

@app.route('/holes_to_mp')
def holes_to_mp_page():
    if holes_to_mp('mont_wright', 'env_config.json') :
        return "Updated"
    return "Error"
