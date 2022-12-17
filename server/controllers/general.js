import User from "../models/User.js";

// Req = Get the parmas and body
// Res = Data we send to the front end
export const getUser = async (req, res) => {
  try {
    /*
        req.params is the ID passed to us from the front end route
        router.get("user/:id", getUser)
    */
    const { id } = req.params;
    const user = await User.findById(id);
    /* 
        If this block fires then send the user data to
        the front end 
    */
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
