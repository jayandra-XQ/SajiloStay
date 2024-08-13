

export const profile = async (req,res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in profile controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}