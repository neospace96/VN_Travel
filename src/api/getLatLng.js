const APIkey = 'AIzaSyBZCDJchLkCxcHupJWZ7YDCWErOlhHfEK8';
export default (adress) => {
    let url = `https://maps.google.com/maps/api/geocode/json?address=${adress}&key=${APIkey}`;
    return fetch(url).then(res => res.json());
};
