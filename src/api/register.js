const register = (email, name, password ) => (
    fetch('http://192.168.56.1:8080/DACN/register.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, name, password})
    })
    .then(res => res.text())
);

module.exports = register;
