const User = require("../models/UserModel");

// module.exports.addToLikedMovies = async (req, res) => {
//     try {
//         const{email,data}=req.body;
//         const user = await User.findOne({email});
//         if(user){
//             const{likedMovies}=user;
//             const movieAlreadyLiked=likedMovies.find(({id})=>(id=data.id));
//             if(!movieAlreadyLiked){
//                 await User.findByIdAndUpdate(user._id,{
//                     likedMovies:[...user.likedMovies,data],
//                 },{
//                     new:true
//                 });
//             }
//             else return res,json({msg:"Movie Already added to the liked list"});
//         }else await User.create({email,likedMovies:[data ]});
//         return res.json({msg:'Movie Added Successfully'});
//     } catch (error) {
//         return res.json({msg:"Error adding Movies"})
//         console.log(error);
//     }
// };

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

module.exports.getUserLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else {
      return rse.json({ msg: "user with given email not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) res.status(400).send({ msg: "Movie Not Found" });
      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies,
        },
        { new: true }
      );
      return res.json({ msg: "movie Deleted", movies: likedMovies });
    }
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};
