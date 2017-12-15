const checkLogin = (token) => (
    fetch('http://192.168.56.1:8080/DACN/check_login.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.json())
);

module.exports = checkLogin;
