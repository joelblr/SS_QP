from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route("/")
def index() :
    return render_template("./index.html")


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

    return render_template('form.html')

if __name__ == '__main__':
    app.run(debug=True)
