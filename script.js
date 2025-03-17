document.getElementById("captchaForm").onsubmit = function(event) {
    event.preventDefault();
    grecaptcha.ready(function() {
        grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'}).then(function(token) {
            document.getElementById('recaptchaResponse').value = token;
            fetch('/verify_captcha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recaptchaResponse: token })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("responseMessage").innerText = data.message;
            });
        });
    });
};