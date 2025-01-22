from flask import Flask, render_template, request, redirect, url_for
from server.acc_app import Acc_Routes
from server.caafr_app import Caafr_Routes
from server.wsb_app import WSB_Routes
from server.llm_app import LLM_Routes


def create_server():
    server = Flask(__name__)

    # server.register_blueprint(Acc_Routes.acc_router, url_prefix="/auth")
    # server.register_blueprint(Caafr_Routes.caafr_router, url_prefix="/caafr")
    # server.register_blueprint(WSB_Routes.wsb_router, url_prefix="/scraper-bot")
    # server.register_blueprint(LLM_Routes.llm_router, url_prefix="/llm")

    return server


app = create_server()


# @app.route("/")
# def index() :
#     return render_template("./index.html")
@app.route('/', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        standard = request.form.get('std')
        chap1 = request.form.get('chap1')
        chap2 = request.form.get('chap2')
        yrs1 = request.form.get('yrs1')
        yrs2 = request.form.get('yrs2')
        save_as = request.form.get('save-as')

        # Process the data here
        print(f"Standard: {standard}")
        print(f"Chapters Range: {chap1} to {chap2}")
        print(f"Years Range: {yrs1} to {yrs2}")
        print(f"Save as: {save_as}")

        # Redirect after POST to avoid re-submitting the form on page reload
        return redirect(url_for('form'))

    return render_template('index.html')


# if __name__ == '__main__':
#     app.run(debug=True)
# Run the Flask app
if __name__ == '__main__':

    # PORT = int(os.getenv('PORT', env_mgr.get_env_key("BACKEND_PORT")))
    # PORT = os.environ.get("PORT", int(env_mgr.get_env_key("BACKEND_PORT")))

    PORT = 5000 #int(env_mgr.get_env_key("BACKEND_PORT"))
    print(f"Back-end Server running @http://localhost:{PORT}")
    from werkzeug.serving import run_simple
    run_simple('localhost', PORT, app,
    #  use_debugger=True, use_reloader=True
    )

    # from waitress import serve
    # serve(app, host="0.0.0.0", port=PORT)

# cmd: waitress-serve --listen=127.0.0.1:5000 run_server:app
