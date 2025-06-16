import  express  from "express"
import mainRoutes from "./routes/mainRoutes"
import env from "./helpers/config"

const app=express()
const port=env.PORT;
app.use(express.json())
app.use(mainRoutes)

app.listen(port,()=>{
    console.log("Server running on port",port)
})