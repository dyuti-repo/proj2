const express =require('express')
const pcmsRouter = express.Router()
const https = require('https')

    
pcmsRouter.get('',async(req,res)=>{
     
    try{
        let data = '';
        const { HttpsProxyAgent } = require('https-proxy-agent');//proxy api call code starts 
        const endpointUrl = 'https://raddy.dev/wp-json/wp/v2/posts';// Define the URL of the endpoint you want to make a request to
        const proxyUrl = 'http://192.183.99.101:3128'; // Replace with your proxy server's URL        // Define the proxy server's URL
        const proxyAgent = new HttpsProxyAgent(proxyUrl);        // Create an instance of HttpsProxyAgent with the proxy URL
        const options = {         // Options for the HTTPS request, including the proxy agent
            method: 'GET',
            agent: proxyAgent,         // Add any other options here, such as headers or query parameters
            };
        https.get(endpointUrl, options, (response) => { // Make a GET request to the endpoint through the proxy
        response.on('data', (chunk) => {         // A chunk of data has been received
            data += chunk;});

        // const stringifyObject = (obj) => {
        //         return JSON.stringify(obj);
        //     };
        //*****************newly added***************** */
        // The whole response has been received
        response.on('end', () => {
        console.log(data);
        const stringifyData = (data) => {            // Custom Handlebars helper function to stringify data
            return JSON.stringify(data);
        };
        const apiData = data.data;
        console.log('after parse')
        console.log(JSON.parse(data));
        //res.render('pcms',{articles:JSON.parse(data).data});
        res.render('pcms',{ apiData, stringifyData });     // Render the 'index' template with the fetched data
            });
        }).on('error', (error) => {
    console.error('Error fetching data:', error);
        });

    }catch(error){
        if(error.response){
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        }else if(error.request){
            console.log(error.request)
        }else{
            console.error('error',error.message)
        }
    }
})
     
//*******ends here****************


module.exports = pcmsRouter