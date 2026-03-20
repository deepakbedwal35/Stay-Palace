init -- initilisation folder database data
Project Inspired By Airbnb
<<<<<<< HEAD
=======


//  listings to review Relationship : one to many 
**Create Reviews :**
Two step :
1. setting up reviews form 
 Create a form for review in show.ejs

2. Submiting the Form :
   POST /LISTINGS/:id/reviews

Validate Review :
1. Client Side ( Form )
2. Server Side by 3 ways:
   joi schema
   schema validate fn
   middlewares


Deleting Listing :
then should  
 Delete Middleware for reviews

>>>>>>> afe93a3 (added review author delete authorization and UI fix)


User Multer npm package to handle images 
and then image store at cloud and use cloudinary service and setup it
Multer + cloudinary.uploader.upload() i use this insteaad of  then image store at cloud and use cloudinary service.
**Image Upload Working**
1️⃣ User selects images in frontend
2️⃣ FormData sends multipart/form-data request
3️⃣ Multer receives request
4️⃣ Multer saves files in /uploads temp folder
5️⃣ Your loop uploads each file to Cloudinary CDN
6️⃣ Cloudinary returns secure image URL
7️⃣ You push URL into array
8️⃣ Temp file deleted from server
9️⃣ Response sent to frontend

Client → Multer (memory buffer)
      → Streamifier converts buffer → stream
      → Cloudinary upload_stream
      → Cloudinary URL returned

buffer memory is a temporary, high-speed storage area—usually in RAM—that holds data while it is being transferred between two locations, such as a CPU and a peripheral device. It bridges speed gaps between components, ensuring smooth data flow for tasks like video streaming, file transfers, or printing. 


streamifier vs Readable.from()
Feature	streamifier	Readable.from
Dependency	❌ Extra package	✅ Native
Performance	Good	⭐ Better
Maintainability	Medium	⭐ Best
Future Proof	Medium	⭐ High
Code Clean	Medium	⭐ Very Clean
Popularity Now	Declining	⭐ Increasing
👉 So Readable.from wins
🚨 EVEN BETTER THAN BOTH? (Real Senior Answer)
YES.
If your architecture allows:
⭐ Best Architecture → Direct Upload from Frontend → Cloudinary
No multer
No buffer
No server load
No stream conversion
Flow:
Client → Cloudinary Signed Upload → URL → Send URL to Backend
This is:
🔥 Fastest
🔥 Cheapest
🔥 Most scalable
🔥 Used in SaaS / startups / big systems