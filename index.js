import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import  cors  from "cors";
import  dotenv  from "dotenv";
import  helmet  from "helmet";
import morgan from "morgan";
import path from "path";
import  {fileURLToPath}  from "url";
import {register} from "./Controllers/auth.js"
import  authRoutes  from './routes/auth.js'
import  userRoutes  from './routes/user.js'
import  postRoutes  from './routes/post.js'

// configuration 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
dotenv.config();
const PORT = process.env.SERVER_PORT || 5000 ;
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended : true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))


// File storage 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({storage})


// Routes With Files
app.post("/auth/register", upload.single('image'), register);
// app.post("/auth/register", upload.single('image'), register);

app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/post",postRoutes)

app.listen(PORT,() => {
    console.log(`server started on port ${PORT}`)
})