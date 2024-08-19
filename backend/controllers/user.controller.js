import Place from "../models/place.model.js";

export const profile = async (req,res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in profile controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const placeAdd = async (req,res) => {
  try {
    // Extract and format photos from the request body
    const photos = Array.isArray(req.body.photos) ? req.body.photos.flat() : []; 

    const placeDoc = await Place.create({
      owner: req.user._id,
      title: req.body.title,
      address: req.body.address,
      photos, // Use the formatted array
      description: req.body.description,
      extraInfo: req.body.extraInfo,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      maxGuests: req.body.maxGuests
    });
    res.json(placeDoc);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({message: "Invalid request body from server " + error.message});
  }
  
}

export const placeList = async (req,res) => {
  try {
    const places = await Place.find({owner: req.user._id}).populate('owner');
    res.json(places);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
}