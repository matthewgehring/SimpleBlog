var bodyParser =   require("body-parser"),
    mongoose    =   require("mongoose"),
    express     =   require("express"),
    app         =   express();

mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

// title
// image
// body
// created

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTful routes
//Home
app.get("/", function(req, res){
    res.redirect("/blogs");
});
//INDEX Route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs : blogs});
        }
    })
});
//NEW Route
app.get("/new", function(req, res){
    res.render("new");
});
//CREATE Route
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    })
});

//SHOW Route
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            console.log(err);
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Blog has started"); 
});
