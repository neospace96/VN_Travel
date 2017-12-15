const signIn = (email, password) => (
    fetch('http://192.168.56.1:8080/DACN/login.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
);

module.exports = signIn;
