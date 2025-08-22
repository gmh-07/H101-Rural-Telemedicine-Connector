import { ClinicModel } from "../modles/doctorClinicModel";

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export const NearByDoctorsClinic = async (req, res) => {
    const token = req.cookies.uidcookie;

    if (!token) {
        return res.json({ message: "not_signedIn" });
    }

    const { userLattitude, userLongitude } = req.body;

    const AllClinicsFromDB = await ClinicModel.find({});

  
    let ClinicDistanceFromUser = AllClinicsFromDB.map(clinic => ({
        distance: getDistanceFromLatLonInKm(userLattitude, userLongitude, clinic.Lattitude, clinic.Longitude),
        latitude: clinic.Lattitude,
        longitude: clinic.Longitude
    }));

   
    ClinicDistanceFromUser.sort((a, b) => a.distance - b.distance);

    let NearestClinicArray =[];

    //top 3 clinics only  just ensure that more than 3 clinics must present
    for(let i=0;i<3;i++){
        NearestClinicArray.push(ClinicDistanceFromUser[i]);
    }

    res.json({
        message: "nearest clinics location",
        NearestClinicArray
    });
};