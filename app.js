// ------------defaults-------------
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const { title } = require('process');
const apiKey = 'd32affe5603295cd523f378bb2f5bef1' 



app.set('view engine', 'ejs')
// --------------Path------------------
app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'/views'))


let request = 'popular'

// --------------APIS------------------

    app.get('/movies/:top_rated',async (req,res)=>{
        
          const movieType =  req.params.top_rated
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieType}?api_key=${apiKey}`);
    const results = response.data.results;

    function Allmovies(x) {
    const title = response.data.results[x].title;
    const overView = response.data.results[x].overview;
    const rate = response.data.results[x].vote_average;
    const imagePath = response.data.results[x].poster_path;
    const image = `https://image.tmdb.org/t/p/original/${imagePath}`;
   
  


        return {'title':title,'overView':overView,'rate':rate, 'image':image }
        
    }
    const choose = "movies";
    res.render('movies',{Allmovies,movieType,choose})
    console.log(req.body)
    })


    app.get('/movies',(req,res)=>{
        const movieType='Choose From'
        const image=''
        const choose = 'drop down menu'
        const Allmovies=()=>{ return {'title':'title','overView':'overView','rate':'rate', 'image':'image' }};
        res.render('movies',{movieType,Allmovies,image,choose});
    })
    



// --------------Home Page------------------

// --------------Port------------------
app.listen(3000,()=>{
    console.log("Listening to port 3000")
  })


//   app.get('/rand',(req,res)=>{
//     res.render('random', {rand:num});
// })

