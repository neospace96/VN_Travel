const getListTour = (idCity) => {
    let url = `http://192.168.56.1:8080/DACN/getTour_byCity.php?id_city=${idCity}`;
    return fetch(url)
    .then(res => res.json());
};

export default getListTour;
