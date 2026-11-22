// "use client";

// import { Orbitron, Rajdhani, Space_Grotesk } from "next/font/google";
// const orbitron = Orbitron({
//   subsets: ["latin"],
//   variable: "--font-orbitron",
//   weight: ["400", "500", "600", "700", "800", "900"],
// });

// const rajdhani = Rajdhani({
//   subsets: ["latin"],
//   variable: "--font-rajdhani",
//   weight: ["400", "500", "600", "700"],
// });

// // Used only for alumni names and company.
// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   variable: "--font-space-grotesk",
//   weight: ["400", "500", "600", "700"],
// });

// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import { useCallback, useEffect, useRef, useState } from "react";
// import {
//   ArrowUpRight,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Linkedin
// } from "lucide-react";



// const alumniBatches = ["2023", "2022", "2021","2020", "2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007"];

// const alumniPhotos = {
// //   "2023": [
// //     { filename: "aakriti.jpeg", name: "Aakriti Paul", linkedin: "https://www.linkedin.com/in/aakriti-paul-04626a316/" },
// //     { filename: "ab.jpg", name: "Ayush Bhagat", linkedin: "https://www.linkedin.com/in/ayush-k-bhagat/" },
// //     { filename: "abishek.jpg", name: "Abhishek Prasad", linkedin: "https://www.linkedin.com/in/abhishekprasad09/" },
// //     { filename: "aditya.jpeg", name: "Aditya Raj", linkedin: "https://www.linkedin.com/in/aditya-raj-461a31274" },
// //     { filename: "amit.jpeg", name: "Amit Gupta", linkedin: "https://www.linkedin.com/in/amitkrgupta31/" },
// //     { filename: "ankit.jpeg", name: "Ankit Yadav", linkedin: "https://www.linkedin.com/in/ankit-yadav-b95a35290/" },
// //     { filename: "Anukriti.jpg", name: "Anukriti Kumari", linkedin: "https://www.linkedin.com/in/anukriti-kumari-bb5625290/" },
// //     { filename: "kashish.jpeg", name: "Kashish Kumari", linkedin: "https://www.linkedin.com/in/kashish-kumari-898771327/" },
// //     { filename: "neeraj.jpeg", name: "Neeraj Kachhap", linkedin: "https://www.linkedin.com/in/neeraj-kachhap-081911303/" },
// //     { filename: "punam.jpeg", name: "Punam Kumari", linkedin: "https://www.linkedin.com/in/punam-kumari-b17b0a282/" },
// //     { filename: "roushan.jpeg", name: "Roushan Raj", linkedin: "https://www.linkedin.com/in/roushan-raj-cmd007/" },
// //     { filename: "sakshee.jpg", name: "Sakshee Dubey", linkedin: "https://www.linkedin.com/in/sakshee-dubey-0b3459291/" },
// //     { filename: "vishnu.jpg", name: "Vishnu Singh", linkedin: "https://www.linkedin.com/in/vishnu-singh-munda-a88a93290/" },
// //     { filename: "warsha.jpeg", name: "Warsha Karketta", linkedin: "https://www.linkedin.com/in/warsha840/" },
// //   ],

// //   "2022": [
// //     { filename: "Adarsh.jpg", name: "Adarsh Kumar", linkedin: "https://www.linkedin.com/in/adarsh-kumar-abb0a3259/",company:"" },
// //     { filename: "Anjali1.jpg", name: "Anjali Singh", linkedin: "https://www.linkedin.com/in/anjali-singh-58a58b257/",company:"" },
// //     { filename: "Anshika.jpeg", name: "Anshika Mishra", linkedin: "https://www.linkedin.com/in/anshika-mishra-2a7641257/",company:"" },
// //     { filename: "Aquib.jpg", name: "Aquib Aftab", linkedin: "https://www.linkedin.com/in/aquib-aftab-65917b252/",company:"" },
// //     { filename: "Deepti.jpeg", name: "Deepti Kumari", linkedin: "https://www.linkedin.com/in/deepti-kumari-482049258/",company:"" },
// //     { filename: "Faizan.jpg", name: "Faizan Ahmad", linkedin: "https://www.linkedin.com/in/faizan-ahmad-full-stack/" ,company:""},
// //     { filename: "Mayank1.jpeg", name: "Kumar Mayank", linkedin: "https://www.linkedin.com/in/kumar-mayank-410660221/",company:"" },
// //     { filename: "Puspam.png", name: "Puspam Jha", linkedin: "https://www.linkedin.com/in/puspam-jha-44606a225/",company:"" },
// //     { filename: "Rahul.jpg", name: "Rahul Kumar Das", linkedin: "https://www.linkedin.com/in/rahul-das-169596258/",company:"" },
// //     { filename: "Rudra.jpg", name: "Rudranil Ganguly", linkedin: "https://www.linkedin.com/in/rudranil-ganguly-305411254/",company:"" },
// //     { filename: "Shaswat.jpg", name: "Kumar Shaswat", linkedin: "https://www.linkedin.com/in/kumar-shaswat-3a252a35a/",company:"" },
// //     { filename: "Shivam.jpeg", name: "Shivam Singh", linkedin: "https://www.linkedin.com/in/shivamsinghpsss/" ,company:""},
// //     { filename: "simran.jpeg", name: "Simran", linkedin: "https://www.linkedin.com/in/simran-bb9338258/",company:"" },
// //     { filename: "sonali.png", name: "Sonali Gorai", linkedin: "https://www.linkedin.com/in/sonali-gorai-b0a631264/" ,company:""},
// //     { filename: "Sashi_s.jpeg", name: "Sashi Sekhar Singh", linkedin: "https://www.linkedin.com/in/sashi-sekhar-singh-858a5424a/",company:"" },
// //   ],

//   "2021": [
//     { filename: "ADARSH_IETE.jpg", name: "Adarsh Trivedi", linkedin: "https://www.linkedin.com/in/adarsh-trivedi-10ba6a22a/",company:"Yamaha Motor Solutions India" },
//     { filename: "Ankita.jpg", name: "Ankita Ghosh", linkedin: "https://www.linkedin.com/in/ankitag39/",company:"TCS" },
//     { filename: "Ashish.jpg", name: "Ashish Sinha", linkedin: "https://www.linkedin.com/in/ashish-kumar-sinha-82215124a/",company:"Shree Cement Ltd." },
//     { filename: "Avinash.jpeg", name: "Avinash Yadav", linkedin: "https://www.linkedin.com/in/beyond-avinash/",company:"Youtube Growth Partner @Starter Story" },
//     { filename: "Ayushi.jpeg", name: "Ayushi Tewary", linkedin: "https://www.linkedin.com/in/ayushi-tewary-922ba5253/",company:"Tata Hitachi Construction Machinery Company Private " },
//     { filename: "Deepak.jpg", name: "Deepak Kumar", linkedin: "https://www.linkedin.com/in/deepak-kumar-052779225/",company:"StampMyVisa" },
//     { filename: "Mehar.jpg", name: "Mehar Talat", linkedin: "https://www.linkedin.com/in/mehartalat/",company:"Bokaro Steel Limited, SAIL" },
//     { filename: "Priyanshu.jpg", name: "Priyanshu Mukherjee", linkedin: "https://www.linkedin.com/in/mukherjee-priyanshu/" ,company:"XLRI Jamshedpur"},
//     { filename: "Rahul_J.jpg", name: "Rahul Jha", linkedin: "https://www.linkedin.com/in/jharahul28/",company:"GlobalLogic" },
//     { filename: "RAHUL_KR_IETE.jpg", name: "Rahul Kumar", linkedin: "https://www.linkedin.com/in/rahul-kumar-4b133a23b/recent-activity/all/",company:"TCS" },
//     { filename: "Rishita.jpg", name: "Rishita Dutta", linkedin: "https://www.linkedin.com/in/rishita-dutta-24a91824a/",company:"JSW" },
//     { filename: "Rohit_iete.jpg", name: "Rohit Kumar Grihi", linkedin: "https://www.linkedin.com/in/rohit-kumar-grihi/",company:"Pi42" },
//     { filename: "Saron.jpg", name: "Saron Mukti Ekka", linkedin: "https://www.linkedin.com/in/saron-ekka/",company:"IIM Bangalore" },
//     { filename: "Supriya.jpg", name: "Supriya Sharma", linkedin: "https://www.linkedin.com/in/supriya-sharma-6a2057225/",company:"Nalco water India private limited, an Ecolab Company" },
//   ],

//   "2020": [
//   { filename: "rajat.png",name: "Rajat Choudhary",linkedin: "https://www.linkedin.com/in/rajat1908/",company:"GlobalLogical Hitachi"},
//   { filename: "mukund.png",name: "Mukund Parashar",linkedin: "https://www.linkedin.com/in/mukund-prashar-4a9168214/",company:"Tata Steel"},
//   { filename: "megha.png",name: "Megha",linkedin: "https://www.linkedin.com/in/megha-singh-5a8ba41bb/",company:"TCS Digital"},
//   { filename: "randeep.png",name: "Rana Randeep",linkedin: "https://www.linkedin.com/in/rana-randeep-ab0aa0202/",company:"Vedanta"},
//   { filename: "muskan.png",name: "Muskan Naaz",linkedin: "https://www.linkedin.com/in/muskan-naaz-a112ba208/",company:"HUL"},
//   { filename: "sandeep.png",name: "Sandeep Kr. Hembrom",linkedin: "https://www.linkedin.com/in/sandeephembrom/",company:"TCS Ninja"},
//   { filename: "shreya.png",name: "Shreya Prabha",linkedin: "https://www.linkedin.com/in/shreya-prabha-897b27197/",company:"Technip Energies"},
//   { filename: "vaidehi.png", name: "Vaidehi Singh",linkedin: "https://www.linkedin.com/in/vaidehi-singh-a73186207/",company:"Tata Steel"},
//   { filename: "vijay.png",name: "Vijay Lowada",linkedin: "https://www.linkedin.com/in/vijay2002/",company:"TCS Ninja"},
//   { filename: "aman.png",name: "Aman Kr. Singh",linkedin: "https://www.linkedin.com/in/aman-singh-rajput-1b6b351bb/",company:"TCS Digital"},
//   { filename: "avinav.png",name: "Avinav Raj Singh",linkedin: "https://www.linkedin.com/in/avinav-raj-632641207/",company:"Ecolab" },
//   { filename: "=aniket.png", name: "Aniket Kr. Gupta",linkedin: "https://www.linkedin.com/in/aniket-kumar-gupta-4469a1213/",company:"Tata Steel" },
//   { filename: "manisha.png", name: "Manisha Kumari",linkedin: "https://www.linkedin.com/in/manisha-kumari-3a022a217/",company:"Tata Steel" },
//   { filename: "ruma.png", name: "Ruma Rupal",linkedin: "https://www.linkedin.com/in/ruma-rupal-56aa56236/",company:"Higher Studies" },
// ],


//   "2019": [
//     { filename: "Abhishek.jpg", name: "Abhishek Ranjan", linkedin: "https://www.linkedin.com/in/abhishek-ranjan-690a63195/",company:"IIT Madras" },
//     { filename: "AnjaliK.jpg", name: "Anjali Kumari", linkedin: "https://www.linkedin.com/in/anjali-kumari-6677421a7/",company:"EXAVALU" },
//     { filename: "AnjaliP.jpg", name: "Anjali Priya", linkedin: "https://www.linkedin.com/in/anjali-priya-4235571a7/",company:"Technip Energies" },
//     { filename: "Ayush.jpg", name: "Ayush Vijayant", linkedin: "https://www.linkedin.com/in/ayush-vijayant-606566198",company:"TCS Digital" },
//     { filename: "Dhiraj.jpg", name: "Dhiraj Pandey", linkedin: "https://www.linkedin.com/in/dhiraj-pandey-007bitsindri/" ,company:"L&T"},
//     { filename: "Harsha.jpg", name: "Harsha Sinha", linkedin: "https://www.linkedin.com/in/harsha-sinha-9a51601a1/",company:"AMNS" },
//     { filename: "Harshit.jpg", name: "Harshit Pallove", linkedin: "https://www.linkedin.com/in/harshit-pallove-a39505193/" ,company:"Capgemini"},
//     { filename: "Himanshu.jpg", name: "Himanshu Jaiswal", linkedin: "https://www.linkedin.com/in/himanshu-jaiswal-889771197/",company:"Global Logic" },
//     { filename: "Juhi.jpg", name: "Juhi Sinha", linkedin: "https://www.linkedin.com/in/juhi-sinha-8959981b3/",company:"S.K/SAMANTA & Co(P)Ltd." },
//     { filename: "Laxmi.jpg", name: "Lakshmi Sharma", linkedin: "https://www.linkedin.com/in/laxmi-sharma-84806a1b3/",company:"Vedanta" },
//     { filename: "Ravi.jpg", name: "Ravi Kumar", linkedin: "https://www.linkedin.com/in/ravi-kumar-62bb6b158/",company:"TCS NINJA" },
//     { filename: "Shubhangi.jpg", name: "Shubhangi Anand", linkedin: "https://www.linkedin.com/in/shubhangi-anand/",company:"JSW" },
//     { filename: "Simran.jpg", name: "Simran", linkedin: "https://www.linkedin.com/in/simran-125152197/" ,company:"AMNS"},
//     { filename: "Taniya.jpg", name: "Taniya Kumari", linkedin: "https://www.linkedin.com/in/taniya-kumari-a997441a7/",company:"JSW" },
//   ],

//   "2018": [
//   { filename: "abhishek.png",name: "Abhishek Pandey",linkedin: "https://www.linkedin.com/in/abhishekpandey921/",company:"Samsung"},
//   { filename: "abhijeet.png",name: "Abhijit Parashar",linkedin: "https://www.linkedin.com/in/abhijit-parashar-811b34112/",company:"Vedanta"},
//   { filename: "nidhi.png",name: "Nidhi Kumari",linkedin: "https://www.linkedin.com/in/nidhi-kumari-a4ba70198/",company:"Deloitte"},
//   { filename: "rumman.png",name: "Rumman Akhtar",linkedin: "https://www.linkedin.com/in/rummanakhtar/",company:"Cognizant"},
//   { filename: "kiran.png",name: "Kiran Kumari",linkedin: "https://www.linkedin.com/in/kiran-kumari-k99/",company:"Deloitte"},
//   { filename: "roshan.png",name: "Roshan Kumar Singh",linkedin: "https://www.linkedin.com/in/roshan-kumar-singh/",company:"Samsung"},
//   { filename: "pallavi.png",name: "Pallavi Singh",linkedin: "https://www.linkedin.com/in/priyapp/",company:"Schlumberger"},
//   { filename: "shailesh.png", name: "Shailesh Anand",linkedin: "https://www.linkedin.com/in/shailesh-aanand/",company:"Google"},
//   { filename: "deepak.png",name: "Deepak Kumar",linkedin: "https://www.linkedin.com/in/deepak7870/",company:"Deloitte"},
//   { filename: "suraj.png",name: "Suraj Kumar Mahato",linkedin: "https://www.linkedin.com/in/suraj-sloth/",company:"NPCI"},
//   { filename: "",name: "Anjali Singh",linkedin: "https://www.linkedin.com/in/anjali-singh-506502215/",company:"PI Industry" },
//   { filename: "subhabrata.png", name: "Subhabrata Roy",linkedin: "https://www.linkedin.com/in/subhabrata-roy-84038b180/" ,company:"L&T"},

// ],

// "2017": [
//   { filename: "saurav.png",name: "Saurav Tiwary",linkedin: "https://www.linkedin.com/in/saurav-tiwary-bb022214a/",company:"Tata Steel"},
//   { filename: "kanish.png",name: "Kanish Dubey",linkedin: "https://www.linkedin.com/in/kanish-dubey-94610a169/",company:"JSW Steel Ltd."},
//   { filename: "shweta.png",name: "Shweta Singh",linkedin: "https://www.linkedin.com/in/sweta-singh-5b6105194/",company:"TCS"},
//   { filename: "siddharth.png",name: "Siddharth Gupta",linkedin: "https://www.linkedin.com/in/sidharth19th/",company:"Girikon"},
//   { filename: "priya.png",name: "Priya Saluja",linkedin: "https://www.linkedin.com/in/priya-saluja-0627791b2/",company:"TCS"},
//   { filename: "roshan.png",name: "Roshan Singh",linkedin: "https://www.linkedin.com/in/roshan-singh-ba8965170/",company:"Samsung"},
//   { filename: "rashi.png",name: "Rashi Agrawal",linkedin: "https://www.linkedin.com/in/rashi-agarwal-778025174/",company:"Treasurer"},
//   { filename: "abhishek.png",name: "Abhishek Ranjan",linkedin: "https://www.linkedin.com/in/ranjan17abhishek/",company:"Tata Steel"},
//   { filename: "pallav.png",name: "Pallav Tiriyar",linkedin: "https://www.linkedin.com/in/pallav-tiriyar-0aa09b15a/",company:"Deloitte"},
//   { filename: "reema.png",name: "Reema Bharti",linkedin: "https://www.linkedin.com/in/reema-bharti-745793168/",company:"Schlumberger"},
//   { filename: "alice.png",name: "Alice Laguri",linkedin: "https://www.linkedin.com/in/alice-laguri-4827b6148/",company:"TCS" },
//   { filename: "nilesh.png", name: "Nilesh Tiwary",linkedin: "linkedin.com" ,company:"LTD"},

// ],

// "2016": [
//   { filename: "pushpendra.png",name: "Pushpendra Kumar Singh",linkedin: "linkedin.com",company:"Tata Steel"},
//   { filename: "shivank.png",name: "Shivank Jaiswal",linkedin: "linkedin.com",company:"Higher Studies"},
//   { filename: "puja.png",name: "Puja Singh",linkedin: "linkedin.com",company:"Ericsson"},
//   { filename: "pratyush.png",name: "Pratyush Prasad",linkedin: "https://www.linkedin.com/in/pratyush-prasad-62702013b/",company:"Tata Steel"},
//   { filename: "shivam.png",name: "Shivam",linkedin: "linkedin.com",company:"JSW Steel Ltd."},
//   { filename: "abhishek.png",name: "Abhishek Ranjan Tiwary",linkedin: "https://www.linkedin.com/in/abhishek-ranjan-tiwary-318951147/",company:"Tata Power"},
//   { filename: "sayeesta.png",name: "Sayeesta Samrin",linkedin: "https://www.linkedin.com/in/sayeesta-samrin-3a509a14b/",company:"TCS"},
//   { filename: "priyanka.png", name: "Priyanka Tirkey",linkedin: "linkedin.com",company:"Media Head & PRO"},
//   { filename: "shiwani.png",name: "Shiwani Kumari",linkedin: "https://www.linkedin.com/in/shiwani-kumari-a46027145/",company:"Healthplix"},
//   { filename: "shweta.png",name: "Shweta Gupta",linkedin: "linkedin.com",company:"Sify Technology"},

// ],

// "2015": [
//   { filename: "subham.png",name: "Subham Bose",linkedin: "https://www.linkedin.com/in/subham-bose/",company:"IIM Nagpur"},
//   { filename: "kundan.png",name: "Kundan Kumar",linkedin: "linkedin.com",company:"Wipro"},
//   { filename: "rajeev.png",name: "Rajeev Ranjan Raj",linkedin: "https://www.linkedin.com/in/rajeev-ranjan-raj-14a414121",company:"Tata Steel"},
//   { filename: "",name: "Naveen kumar",linkedin: "https://www.linkedin.com/in/naveenkumar227",company:"Cognizant"},
//   { filename: "abhishek.png",name: "Abhishek Tiwari",linkedin: "https://in.linkedin.com/in/abhishek-tiwari-b0b3b83a/",company:"Wipro"},
//   { filename: "srijan.png",name: "Srijan Bharadwaj",linkedin: "https://www.linkedin.com/in/srijan-bharadwaj-497366211/",company:"TCS"},
//   { filename: "",name: "Saket Kumar",linkedin: "linkedin.com",company:"Salesforce"},
//   { filename: "", name: "Jyoti Singh",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Anupriya Sheetu",linkedin: "https://www.linkedin.com/in/anupriya-sheetu-11668015a/",company:"Design Team"},
//   { filename: "",name: "Kaushik Nilay",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Sushmit Anshu",linkedin: "linkedin.com",company:"" },
//   { filename: "", name: "Badal Sahu",linkedin: "linkedin.com" ,company:""},
//   { filename: "", name: "Vivek Sahu",linkedin: "linkedin.com" ,company:""},
//   { filename: "", name: "Kumar Vishist",linkedin: "https://www.linkedin.com/in/kumar-vishist-2005bb124/" ,company:""},

// ],

// "2014": [
//   { filename: "niraj.png",name: "Niraj Kumar",linkedin: "https://www.linkedin.com/in/niraj-kumar-28b774134/",company:"NIT Jamshedpur"},
//   { filename: "nitya.png",name: "Nitya Agrawal",linkedin: "linkedin.com",company:"Nagra Vision Ltd."},
//   { filename: "sudhanshu.png",name: "Sudhanshu Ambastha",linkedin: "https://www.linkedin.com/in/sudhanshu-ambastha/",company:"bloomreach.png"},
//   { filename: "arvind.png",name: "Arvind Marandi",linkedin: "linkedin.com",company:"IIT Kanpur"},
//   { filename: "himanshu.png",name: "Himanshu Harsh",linkedin: "linkedin.com",company:"IIM Visakhapatnam"},
//   { filename: "navtosh.png",name: "Navtosh Arun",linkedin: "https://in.linkedin.com/in/navtosh-arun/",company:"Preparing for UPSC Exam"},
//   { filename: "parimal.png",name: "Parimal Roy",linkedin: "linkedin.com",company:"Rakuten"},
//   { filename: "kritee.png", name: "Kritee Rani",linkedin: "linkedin.com",company:"Datta Meghe Institute of MSci."},
//   { filename: "ashish.png",name: "Ashish Saw",linkedin: "https://www.linkedin.com/in/ashish-kumar-saw-ab2b9212a/",company:"Icici securities"},
  

// ],

// "2013": [
//   { filename: "",name: "Akash Vaibhav",linkedin: "https://www.linkedin.com/in/akashvbhv/",company:"STMicroelectronics"},
//   { filename: "vikas.png",name: "Vikash Kumar",linkedin: "linkedin.com",company:"Indian Railways"},
//   { filename: "",name: "Akshay Aanand",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Soni Kumari",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Manisha Kumari",linkedin: "linkedin.com",company:"Spice jet"},
//   { filename: "",name: "Saket Bharti",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Avinash Kumar Singh",linkedin: "inkedin.com",company:"Spice jet"},
//   { filename: "", name: "Puja Burnwal",linkedin: "inkedin.com",company:"Spice jet"},
//   { filename: "",name: "Sandeep Sinku",linkedin: "inkedin.com",company:""},
//   { filename: "",name: "Saif Ansari",linkedin: "inkedin.com",company:"" },


// ],

// "2012": [
//   { filename: "",name: "Shubham Satyam",linkedin: "https://www.linkedin.com/in/shubham-satyam-9702361ba/",company:"Deloitte"},
//   { filename: "",name: "Priyanka Barik",linkedin: "https://www.linkedin.com/in/priyanka-barik-260809a5/",company:"Blue Yonder"},
//   { filename: "",name: "Rishikant Yadav",linkedin: "https://www.linkedin.com/in/rishikant-yadav-115b99101/",company:"NTPC Limited"},
//   { filename: "",name: "Sumit Kumar",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Sonali Bhagat",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Roushan Sharma",linkedin: "https://www.linkedin.com/in/roushan-sharma-62aa97120/",company:"Signal & Telecom,Indian Railways"},
//   { filename: "",name: "Jagit Singh Dhadial",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Monika Raj",linkedin: "https://www.linkedin.com/in/monikaraj311/",company:"Speridian Technologies"},
//   { filename: "",name: "Dharmendar Kumar",linkedin: "https://www.linkedin.com/in/dharmendar-kumar-8a4538100/",company:"Infosys"},
//   { filename: "",name: "Sudarshan Arya",linkedin: "https://www.linkedin.com/in/sudarshan366arya",company:""},
//   { filename: "",name: "Sumit Kumar",linkedin: "https://www.linkedin.com/in/sumit-kumar-625649158/",company:"Cognizant" },
//   { filename: "",name: "Ruhi Pandey",linkedin: "https://www.linkedin.com/in/ruhipandey1729" ,company:"Rapyd"},
//   { filename: "",name: "Rakesh Kumar",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Uttam Kushwaha",linkedin: "https://www.linkedin.com/in/uttam-kushwaha/",company:""},



// ],

// "2011": [
//   { filename: "",name: "Sumit",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Abhishek Vipalvi",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Saima",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Nitin",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Parwez 5",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Saurav",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Surbhi",linkedin: "linkedin.com",company:""},
//   { filename: "", name: "Manish Kumar",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Sanket",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Suruchi",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Latika",linkedin: "linkedin.com",company:"" },
//   { filename: "", name: "Neha",linkedin: "linkedin.com" ,company:""},
//   { filename: "", name: "Suraj",linkedin: "linkedin.com" ,company:""},

// ],

// "2010": [
//   { filename: "",name: "Chandan Chirag",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Panakaj Narayan",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Anuja",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Niket",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Himanshu",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Smriti Rani",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Sumit Kumar",linkedin: "linkedin.com",company:""},
//   { filename: "", name: "Sunita",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Mayank Shekar",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Amrita Singh",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Puja",linkedin: "linkedin.com",company:"" },
//   { filename: "", name: "Shubhashish",linkedin: "linkedin.com" ,company:""},
//   { filename: "",name: "Gaurav",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Ekta",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Gaurav Kumar",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Annu Preeti",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Abhishek",linkedin: "linkedin.com",company:""},


// ],

// "2009": [
//   { filename: "",name: "Manish",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Ranjan",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Shiv Shankar Tiwari",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Sumit Sahu",linkedin: "linkedin.com",company:""},
  
// ],

// "2008": [
//   { filename: "",name: "Praveen Kumar",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Sashi Shekar",linkedin: "linkedin.com",company:""},

// ],

// "2007": [
//   { filename: "",name: "Digvijay Kumar",linkedin: "linkedin.com",company:""},
//   { filename: "",name: "Sapna Kumari",linkedin: "linkedin.com",company:""},

// ],

// };

// const alumniDrumData = alumniBatches.map((batch) => ({
//   batch,
//   alumni: (alumniPhotos[batch] || []).map((person) => ({
//     ...person,
//     image: `/Alumni/2k${batch.slice(2)}/${person.filename}`,
//   })),
// }));


// function NetworkBackground() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const section = canvas.parentElement;
//     if (!section) return;

//     let animationFrame;
//     let width = 0;
//     let height = 0;
//     let dots = [];
//     let time = 0;

//     const cursor = { x: -1000, y: -1000, active: false };

//     const resizeCanvas = () => {
//       const rect = section.getBoundingClientRect();
//       const dpr = Math.min(window.devicePixelRatio || 1, 2);

//       width = rect.width;
//       height = rect.height;

//       canvas.width = Math.round(width * dpr);
//       canvas.height = Math.round(height * dpr);

//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//       const count = Math.max(22, Math.floor((width * height) / 20000));

//       dots = Array.from({ length: count }, () => ({
//         x: Math.random() * width,
//         y: Math.random() * height,
//         radius: Math.random() * 1.2 + 0.6,
//         phase: Math.random() * Math.PI * 2,
//         speed: Math.random() * 0.35 + 0.2,
//         driftX: (Math.random() - 0.5) * 0.12,
//         driftY: (Math.random() - 0.5) * 0.12,
//       }));
//     };

//     const handlePointerMove = (event) => {
//       const rect = section.getBoundingClientRect();
//       cursor.x = event.clientX - rect.left;
//       cursor.y = event.clientY - rect.top;
//       cursor.active = true;
//     };

//     const handlePointerLeave = () => {
//       cursor.active = false;
//     };

//     const draw = () => {
//       time += 0.008;
//       ctx.clearRect(0, 0, width, height);

//       const cursorRadius = Math.min(width, height) * 0.24;

//       if (cursor.active) {
//         const glow = ctx.createRadialGradient(
//           cursor.x, cursor.y, 0,
//           cursor.x, cursor.y, cursorRadius
//         );

//         glow.addColorStop(0, "rgba(75, 177, 224, 0.16)");
//         glow.addColorStop(0.5, "rgba(75, 177, 224, 0.06)");
//         glow.addColorStop(1, "rgba(75, 177, 224, 0)");

//         ctx.fillStyle = glow;
//         ctx.fillRect(0, 0, width, height);
//       }

//       const maxDistance = Math.min(width, height) * 0.32;

//       for (let i = 0; i < dots.length; i++) {
//         const a = dots[i];

//         for (let j = i + 1; j < dots.length; j++) {
//           const b = dots[j];
//           const distance = Math.hypot(a.x - b.x, a.y - b.y);

//           if (distance >= maxDistance) continue;

//           const proximity = 1 - distance / maxDistance;
//           const midX = (a.x + b.x) / 2;
//           const midY = (a.y + b.y) / 2;

//           let opacity = proximity * 0.12;
//           let color = "105, 157, 184";

//           if (cursor.active) {
//             const cursorDistance = Math.hypot(
//               midX - cursor.x,
//               midY - cursor.y
//             );
//             const influence = Math.max(
//               0,
//               1 - cursorDistance / cursorRadius
//             );

//             opacity += influence * 0.38;

//             if (influence > 0.05) color = "103, 205, 245";
//           }

//           ctx.beginPath();
//           ctx.moveTo(a.x, a.y);
//           ctx.lineTo(b.x, b.y);
//           ctx.strokeStyle = `rgba(${color}, ${Math.min(opacity, 0.65)})`;
//           ctx.lineWidth = 0.6;
//           ctx.stroke();
//         }
//       }

//       dots.forEach((dot) => {
//         dot.x += dot.driftX;
//         dot.y += dot.driftY;

//         if (dot.x < 0) dot.x = width;
//         if (dot.x > width) dot.x = 0;
//         if (dot.y < 0) dot.y = height;
//         if (dot.y > height) dot.y = 0;

//         const pulse = (Math.sin(time * dot.speed + dot.phase) + 1) / 2;

//         let opacity = 0.18 + pulse * 0.22;
//         let radius = dot.radius;
//         let color = "133, 183, 207";

//         if (cursor.active) {
//           const distance = Math.hypot(
//             dot.x - cursor.x,
//             dot.y - cursor.y
//           );
//           const influence = Math.max(
//             0,
//             1 - distance / cursorRadius
//           );

//           opacity += influence * 0.45;
//           radius += influence * 1.1;

//           if (influence > 0.1) color = "145, 224, 255";
//         }

//         ctx.beginPath();
//         ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(${color}, ${Math.min(opacity, 0.95)})`;
//         ctx.fill();
//       });

//       if (cursor.active) {
//         const nearbyDots = dots
//           .map((dot) => ({
//             dot,
//             distance: Math.hypot(
//               dot.x - cursor.x,
//               dot.y - cursor.y
//             ),
//           }))
//           .filter(({ distance }) => distance < cursorRadius)
//           .sort((a, b) => a.distance - b.distance)
//           .slice(0, 7);

//         nearbyDots.forEach(({ dot, distance }) => {
//           const opacity = (1 - distance / cursorRadius) * 0.42;

//           ctx.beginPath();
//           ctx.moveTo(cursor.x, cursor.y);
//           ctx.lineTo(dot.x, dot.y);
//           ctx.strokeStyle = `rgba(103, 205, 245, ${opacity})`;
//           ctx.lineWidth = 0.9;
//           ctx.stroke();
//         });
//       }

//       animationFrame = requestAnimationFrame(draw);
//     };

//     resizeCanvas();
//     draw();

//     const resizeObserver = new ResizeObserver(resizeCanvas);
//     resizeObserver.observe(section);

//     window.addEventListener("resize", resizeCanvas);
//     section.addEventListener("pointermove", handlePointerMove);
//     section.addEventListener("pointerleave", handlePointerLeave);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       resizeObserver.disconnect();
//       window.removeEventListener("resize", resizeCanvas);
//       section.removeEventListener("pointermove", handlePointerMove);
//       section.removeEventListener("pointerleave", handlePointerLeave);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       aria-hidden="true"
//       className="network-background-canvas"
//     />
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  SECTION HEADING (unchanged)                                        */
// /* ------------------------------------------------------------------ */

// function SectionHeading({ eyebrow, title, description }) {
//   const headingRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [typedTitle, setTypedTitle] = useState("");

//   useEffect(() => {
//     const element = headingRef.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);

//         if (!entry.isIntersecting) {
//           setTypedTitle("");
//         }
//       },
//       { threshold: 0.35 }
//     );

//     observer.observe(element);

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!isVisible) return;

//     let index = 0;
//     setTypedTitle("");

//     const typingTimer = setInterval(() => {
//       index++;
//       setTypedTitle(title.slice(0, index));

//       if (index >= title.length) {
//         clearInterval(typingTimer);
//       }
//     }, 55);

//     return () => clearInterval(typingTimer);
//   }, [isVisible, title]);

//   return (
//     <div
//       ref={headingRef}
//       className="section-heading mb-10 text-center"
//     >
//       {eyebrow && (
//         <p
//           className={`section-subtitle mb-3 text-xs font-bold uppercase tracking-[0.32em] text-cyan-300 ${
//             isVisible ? "section-fade-in" : "section-hidden"
//           }`}
//         >
//           {eyebrow}
//         </p>
//       )}

//       <h2 className="section-title text-3xl font-bold text-white sm:text-4xl md:text-5xl">
//         <span>{typedTitle}</span>
//         <span className="typing-cursor">|</span>
//         <span className="text-cyan-300">.</span>
//       </h2>

//       {description && (
//         <p
//           className={`mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base ${
//             isVisible ? "section-fade-in description-delay" : "section-hidden"
//           }`}
//         >
//           {description}
//         </p>
//       )}
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  SHARED PIECES                                                      */
// /* ------------------------------------------------------------------ */


// function Portrait({ alumni, className = "", eager = false }) {
//   const [failed, setFailed] = useState(false);
//   const imgRef = useRef(null);
//   const initials = alumni.name
//     .split(" ")
//     .map((w) => w[0])
//     .slice(0, 2)
//     .join("");

//   // Catches images that failed before React hydrated (onError never fires for those).
//   useEffect(() => {
//     const img = imgRef.current;
//     if (img && img.complete && img.naturalWidth === 0) setFailed(true);
//   }, []);

//   if (failed) {
//     return (
//       <div
//         className={`portrait-fallback flex items-center justify-center ${className}`}
//       >
//         <span>{initials}</span>
//       </div>
//     );
//   }

//   return (
//     <img
//       ref={imgRef}
//       src={alumni.image}
//       alt={alumni.name}
//       loading={eager ? "eager" : "lazy"}
//       draggable={false}
//       onError={() => setFailed(true)}
//       className={`object-cover object-center ${className}`}
//     />
//   );
// }

// function LinkedInButton({ alumni, compact = false }) {
//   if (!alumni?.linkedin) return null;
//   return (
//     <a
//       href={alumni.linkedin}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label={`Open ${alumni.name}'s LinkedIn profile`}
//       className={compact ? "icon-link" : "cta-link"}
//     >
//       {!compact && <span>LinkedIn</span>}
//       <span aria-hidden="true" className="font-extrabold text-[16px] tracking-tight"> in </span>
//     </a>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  THE DRUM — used for every team                                     */
// /*  Each team sits on a 3D rotating ring that fits in one screen.      */
// /*  Scrolling up/down moves through the page as normal; scrolling      */
// /*  sideways (trackpad / shift + wheel), dragging, swiping, the arrow  */
// /*  keys or the arrow buttons turn the ring. Whoever faces you is lit  */
// /*  up and their details appear underneath automatically.             */
// /* ------------------------------------------------------------------ */

// const mod = (a, n) => ((a % n) + n) % n;
// const PX_PER_MEMBER = 140; // sideways scroll distance that turns one person

// function AlumniDrum({ id, title, description, alumni, showRole = false }) {
//   const sectionRef = useRef(null);
//   const stageRef = useRef(null);
//   const drumRef = useRef(null);
//   const cardRefs = useRef([]);
//   const posRef = useRef(0);
//   const targetRef = useRef(0);
//   const rafRef = useRef(0);
//   const loopRef = useRef(null);
//   const activeRef = useRef(-1);
//   const dragRef = useRef(null);
//   const draggedRef = useRef(false);
//   const snapTimer = useRef(0);
//   const [active, setActive] = useState(0);
//   const [stage, setStage] = useState({ w: 1280, h: 460 });

//   const n = alumni.length;
//   const step = n > 0 ? 360 / n : 0;
//   const tanStep = Math.tan(Math.PI / Math.max(3, n));
//   const isSmall = stage.w < 640;
//   const byHeight = (stage.h - 56) / 1.32;
//   const byWidth = (2 * stage.w * (isSmall ? 1.3 : 0.64) * tanStep) / 1.08;
//   const cardW = Math.round(
//     Math.max(120, Math.min(340, byHeight, byWidth, stage.w * (isSmall ? 0.62 : 0.58)))
//   );
//   const cardH = Math.round(cardW * 1.32);
//   const radius =
//     n >= 3
//       ? Math.round((cardW / 2 / tanStep) * 1.08)
//       : Math.round(cardW * 0.9);
//   const perspective = Math.round(Math.max(1100, radius * 2.6));
//   cardRefs.current.length = n;

//   // Measure the space the ring is allowed to use so everything fits on screen.
//   useEffect(() => {
//     const el = stageRef.current;
//     if (!el) return;
//     const update = () => setStage({ w: el.clientWidth, h: el.clientHeight });
//     update();
//     const ro = new ResizeObserver(update);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   const apply = useCallback(
//     (pos) => {
//       const drum = drumRef.current;
//       if (!drum || n === 0) return;
//       const angle = pos * step;
//       // The tilt pushes the front card down by radius·sin(6°); lift it back to centre.
//       const lift = radius * Math.sin((6 * Math.PI) / 180);
//       drum.style.transform = `translateY(${-lift}px) translateZ(${-radius}px) rotateX(-6deg) rotateY(${-angle}deg)`;

//       cardRefs.current.forEach((card, i) => {
//         if (!card) return;
//         const rel = ((((i * step - angle) % 360) + 540) % 360) - 180;
//         const facing = Math.cos((rel * Math.PI) / 180);
//         card.style.setProperty("--focus", (Math.max(0, facing) ** 3).toFixed(3));
//       });

//       const index = mod(Math.round(pos), n);
//       if (index !== activeRef.current) {
//         activeRef.current = index;
//         setActive(index);
//       }
//     },
//     [n, step, radius]
//   );

//   useEffect(() => {
//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//     const tick = () => {
//       const diff = targetRef.current - posRef.current;
//       posRef.current =
//         reduceMotion || Math.abs(diff) < 0.0005
//           ? targetRef.current
//           : posRef.current + diff * 0.13;
//       apply(posRef.current);
//       rafRef.current =
//         posRef.current === targetRef.current ? 0 : requestAnimationFrame(tick);
//     };
//     loopRef.current = () => {
//       if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
//     };
//     activeRef.current = -1;
//     apply(posRef.current);
//     return () => {
//       cancelAnimationFrame(rafRef.current);
//       rafRef.current = 0;
//     };
//   }, [apply]);

//   const goTo = useCallback((t) => {
//     targetRef.current = t;
//     loopRef.current?.();
//   }, []);

//   const shift = (by) => goTo(Math.round(targetRef.current) + by);

//   const jumpTo = (i) => {
//     const cur = Math.round(targetRef.current);
//     let d = mod(i - cur, n);
//     if (d > n / 2) d -= n;
//     goTo(cur + d);
//   };

//   // Sideways scrolling turns the ring; up/down scrolling is left to the page.
//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el || n === 0) return;
//     const onWheel = (e) => {
//       let dx = e.deltaX;
//       if (e.shiftKey && Math.abs(dx) < 1) dx = e.deltaY;
//       const sideways = e.shiftKey || Math.abs(dx) > Math.abs(e.deltaY);
//       if (!sideways || Math.abs(dx) < 0.5) return;
//       e.preventDefault();
//       const px = e.deltaMode === 1 ? dx * 32 : e.deltaMode === 2 ? dx * 400 : dx;
//       goTo(targetRef.current + px / PX_PER_MEMBER);
//       clearTimeout(snapTimer.current);
//       snapTimer.current = setTimeout(
//         () => goTo(Math.round(targetRef.current)),
//         140
//       );
//     };
//     el.addEventListener("wheel", onWheel, { passive: false });
//     return () => {
//       el.removeEventListener("wheel", onWheel);
//       clearTimeout(snapTimer.current);
//     };
//   }, [n, goTo]);

//   // Drag (mouse) or swipe (touch) sideways to turn the ring.
//   const onPointerDown = (e) => {
//     if (e.button !== 0) return;
//     draggedRef.current = false;
//     dragRef.current = {
//       x: e.clientX,
//       start: targetRef.current,
//       moved: false,
//       lastX: e.clientX,
//       lastT: performance.now(),
//       v: 0,
//     };
//   };

//   const onPointerMove = (e) => {
//     const d = dragRef.current;
//     if (!d) return;
//     const dx = e.clientX - d.x;
//     if (!d.moved) {
//       if (Math.abs(dx) < 6) return;
//       d.moved = true;
//       draggedRef.current = true;
//       stageRef.current?.setPointerCapture?.(e.pointerId);
//     }
//     const now = performance.now();
//     const dt = Math.max(1, now - d.lastT);
//     d.v = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.v;
//     d.lastX = e.clientX;
//     d.lastT = now;
//     goTo(d.start - dx / (cardW * 0.9));
//   };

//   const onPointerUp = () => {
//     const d = dragRef.current;
//     dragRef.current = null;
//     if (!d || !d.moved) return;
//     const fling = Math.max(-3, Math.min(3, (-d.v * 160) / (cardW * 0.9)));
//     goTo(Math.round(targetRef.current + fling));
//   };

//   const onKeyDown = (e) => {
//     if (e.key === "ArrowRight") {
//       e.preventDefault();
//       shift(1);
//     } else if (e.key === "ArrowLeft") {
//       e.preventDefault();
//       shift(-1);
//     }
//   };

//   if (n === 0) return null;
//   const currentIndex = Math.min(active, n - 1);
//   const current = alumni[currentIndex];

//   return (
//     <section
//       ref={sectionRef}
//       id={id}
//       className="drum-section border-t border-white/[0.07]"
//     >
//       <div aria-hidden="true" className="starfield" />

//       <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
//         <SectionHeading title={title} description={description} />
//       </div>

//       <div
//         ref={stageRef}
//         className="drum-stage"
//         tabIndex={0}
//         role="group"
//         aria-roledescription="carousel"
//         aria-label={`${title}: use the left and right arrow keys to turn`}
//         onKeyDown={onKeyDown}
//         onPointerDown={onPointerDown}
//         onPointerMove={onPointerMove}
//         onPointerUp={onPointerUp}
//         onPointerCancel={onPointerUp}
//         style={{ perspective: `${perspective}px` }}
//       >
//         <div
//           ref={drumRef}
//           className="drum"
//           style={{ width: cardW, height: cardH }}
//         >
//           <div
//             aria-hidden="true"
//             className="drum-floor"
//             style={{
//               width: radius * 2 + cardW,
//               height: radius * 2 + cardW,
//               marginLeft: -(radius + cardW / 2),
//               marginTop: -(radius + cardW / 2),
//               transform: `translateY(${cardH / 2 + 22}px) rotateX(90deg)`,
//             }}
//           />

//           {alumni.map((alumni, i) => (
//             <div
//               key={`${id}-${i}`}
//               ref={(el) => {
//                 cardRefs.current[i] = el;
//               }}
//               onClick={() => {
//                 if (!draggedRef.current) jumpTo(i);
//               }}
//               className={`drum-card ${i === currentIndex ? "is-active" : ""}`}
//               style={{
//                 width: cardW,
//                 height: cardH,
//                 transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
//               }}
//             >
//               <div className="drum-face">
//                 <Portrait alumni={alumni} className="drum-photo h-full w-full" eager />
//                 <div className="drum-face-shade" />
//                 <p className="drum-caption">{alumni.name}</p>
//               </div>
//               <div aria-hidden="true" className="drum-back" />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="drum-info relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8">
//         <div className="drum-info-row">
//           <button
//             type="button"
//             className="drum-arrow"
//             aria-label="Previous member"
//             onClick={() => shift(-1)}
//           >
//             <ChevronLeft size={22} />
//           </button>

//           <div key={current.name} className="drum-info-inner" aria-live="polite">
//             {/*{showRole && current.role && (
//               <p className="drum-role">{current.role}</p>
//             )}*/}
//             <h3 className="drum-name">{current.name}</h3>
//             {current.company && (
//               <p className="drum-branch">{current.company}</p>
//             )}
//             <div className="drum-meta">
//               {/*<span className="drum-branch">{current.branch}</span>*/}
//               <LinkedInButton alumni={current} compact />
//             </div>
//           </div>

//           <button
//             type="button"
//             className="drum-arrow"
//             aria-label="Next member"
//             onClick={() => shift(1)}
//           >
//             <ChevronRight size={22} />
//           </button>
//         </div>

//         {/* <p className="drum-hint">
//           <span className="hint-fine">Scroll sideways, drag or use the arrows to spin</span>
//           <span className="hint-touch">Swipe sideways to spin</span>
//         </p> */}
//       </div>
//     </section>
//   );
// }
// export default function MembersPage() {
//   return (
//     <main
//       className={`${orbitron.variable} ${rajdhani.variable} ${spaceGrotesk.variable} members-page relative isolate min-h-screen overflow-x-clip bg-[#050812] text-white`}>
//       <Navbar />

//       <style>{`
//         html {
//           scroll-behavior: smooth;
//           scroll-padding-top: 0;
//         }

//         body {
//           margin: 0;
//           background: #050812;
//         }

//         .font-display {
//           font-family: var(--font-rajdhani), sans-serif;
//         }

//         .section-title {
//           font-family: var(--font-orbitron), sans-serif;
//           font-weight: 700;
//           letter-spacing: 0.025em;
//           text-transform: uppercase;
//           text-shadow: 0 0 24px rgba(34, 211, 238, 0.12);
//         }

//         .section-subtitle,
//         .section-heading p {
//           font-family: var(--font-rajdhani), sans-serif;
//         }

//         .section-hidden {
//           opacity: 0;
//           transform: translateY(18px);
//         }

//         .section-fade-in {
//           animation: sectionFadeIn 0.7s ease-out both;
//         }

//         .description-delay {
//           animation-delay: 0.15s;
//         }

//         .typing-cursor {
//           display: inline-block;
//           margin-left: 3px;
//           color: #67e8f9;
//           animation: cursorBlink 0.7s steps(2, start) infinite;
//         }

//         @keyframes sectionFadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(18px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes cursorBlink {
//           to {
//             visibility: hidden;
//           }
//         }

//         .network-background-canvas {
//           position: absolute;
//           inset: 0;
//           display: block;
//           width: 100%;
//           height: 100%;
//           pointer-events: none;
//           z-index: 0;
//         }

//         @keyframes heroReveal {
//           from {
//             opacity: 0;
//             transform: translateY(22px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .hero-reveal {
//           animation: heroReveal 0.9s ease-out both;
//         }

//         .hero-delay-1 {
//           animation-delay: 0.15s;
//         }

//         .hero-delay-2 {
//           animation-delay: 0.3s;
//         }

//         /* ---------- navy theme for everything below the hero ---------- */
//         .alumni-page {
//           --navy-950: #050b22;
//           --navy-900: #071233;
//           --navy-850: #0a173f;
//           --navy-800: #0f1f4f;
//           --navy-line: rgba(148, 190, 255, 0.12);
//           --cyan: #67e8f9;
//           --cyan-strong: #22d3ee;
//           --nav-offset: 100px;
//           --font-alumni: var(--font-space-grotesk), "Space Grotesk", sans-serif;
//         }

//         @media (max-width: 767px) {
//           .members-page {
//             --nav-offset: 84px;
//           }
//         }

//         .portrait-fallback {
//           background:
//             radial-gradient(circle at 30% 25%, rgba(103, 232, 249, 0.35), transparent 55%),
//             linear-gradient(160deg, #13286b, #081236);
//           color: #cffafe;
//           font-family: var(--font-orbitron), sans-serif;
//           font-weight: 700;
//           letter-spacing: 0.08em;
//           font-size: clamp(0.8rem, 2.4vw, 1.6rem);
//         }

//         .starfield {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//           background-image:
//             radial-gradient(1px 1px at 12px 24px, rgba(255, 255, 255, 0.55), transparent 60%),
//             radial-gradient(1px 1px at 90px 140px, rgba(186, 230, 253, 0.5), transparent 60%),
//             radial-gradient(1.5px 1.5px at 170px 70px, rgba(103, 232, 249, 0.55), transparent 60%),
//             radial-gradient(1px 1px at 230px 210px, rgba(255, 255, 255, 0.4), transparent 60%);
//           background-size: 260px 260px;
//           animation: twinkle 6s ease-in-out infinite;
//           opacity: 0.55;
//         }

//         @keyframes twinkle {
//           50% {
//             opacity: 0.25;
//           }
//         }

//         .cta-link {
//           display: inline-flex;
//           flex-shrink: 0;
//           align-items: center;
//           gap: 0.5rem;
//           border-radius: 999px;
//           border: 1px solid rgba(103, 232, 249, 0.4);
//           background: rgba(34, 211, 238, 0.06);
//           padding: 0.65rem 1.15rem;
//           font-family: var(--font-rajdhani), sans-serif;
//           font-size: 0.8rem;
//           font-weight: 700;
//           letter-spacing: 0.16em;
//           text-transform: uppercase;
//           color: #cffafe;
//           transition: background 0.3s, color 0.3s, box-shadow 0.3s;
//         }

//         .cta-link:hover {
//           background: var(--cyan);
//           color: var(--navy-950);
//           box-shadow: 0 0 30px rgba(103, 232, 249, 0.45);
//         }

//         .icon-link {
//           display: inline-flex;
//           height: 40px;
//           width: 40px;
//           flex-shrink: 0;
//           align-items: center;
//           justify-content: center;
//           border-radius: 999px;
//           border: 1px solid rgba(148, 190, 255, 0.25);
//           background: transparent;
//           color: #fff;
//           cursor: pointer;
//           transition: all 0.35s cubic-bezier(0.2,0.8,0.2,1);
//         }
//         .icon-link:hover {
//           border-color: #0A66C2;
//           background: #0A66C2;
//           color: #ffffff;
//           transform: scale(1.08);
//           box-shadow: 0 0 14px rgba(10, 102, 194, 0.45);
//         }

//         .icon-link:hover span {
//           color: #0A66C2;
//         }

//         .icon-link:focus-visible {
//          outline: 2px solid #0A66C2;
//          outline-offset: 4px;
//         }

//         .icon-link:hover {
//           background: var(--cyan);
//           border-color: var(--cyan);
//           color: var(--navy-950);
//         }

//         .cta-link:focus-visible,
//         .icon-link:focus-visible,
//         .drum-stage:focus-visible {
//           outline: 2px solid var(--cyan);
//           outline-offset: 3px;
//         }

//         /* ---------- THE DRUM (every team) ---------- */
//         .drum-section {
//           position: relative;
//           display: flex;
//           flex-direction: column;
//           height: 100svh;
//           min-height: 600px;
//           overflow: hidden;
//           padding: var(--nav-offset) 0 clamp(14px, 2.6vh, 30px);
//           background:
//             radial-gradient(ellipse at 50% 55%, rgba(8, 100, 160, 0.2), transparent 55%),
//             radial-gradient(ellipse at 20% 85%, rgba(14, 116, 144, 0.09), transparent 45%),
//             #050812;
//         }

//         .drum-section .section-heading {
//           margin-bottom: 0;
//         }

//         .drum-section .section-title {
//           font-size: clamp(1.5rem, 3.4vw, 2.6rem);
//         }

//         .drum-section .section-heading p:not(.section-subtitle) {
//           margin-top: 0.35rem;
//         }

//         .drum-stage {
//           position: relative;
//           z-index: 5;
//           display: flex;
//           flex: 1 1 0;
//           min-height: 0;
//           align-items: center;
//           justify-content: center;
//           cursor: grab;
//           touch-action: pan-y;
//           user-select: none;
//           -webkit-user-select: none;
//           outline: none;
//         }

//         .drum-stage:active {
//           cursor: grabbing;
//         }

//         .drum-stage:focus-visible .drum-card.is-active .drum-face {
//           outline: 2px solid var(--cyan);
//           outline-offset: 6px;
//         }

//         .drum {
//           position: relative;
//           transform-style: preserve-3d;
//           will-change: transform;
//         }

//         .drum-card {
//           position: absolute;
//           inset: 0;
//           cursor: pointer;
//           transform-style: preserve-3d;
//         }

//         .drum-face,
//         .drum-back {
//           position: absolute;
//           inset: 0;
//           overflow: hidden;
//           border-radius: 20px;
//           backface-visibility: hidden;
//           -webkit-backface-visibility: hidden;
//         }

//         .drum-face {
//           border: 1px solid rgba(148, 190, 255, 0.18);
//           background: var(--navy-800);
//           box-shadow: 0 20px 60px rgba(2, 6, 23, 0.6);
//           transition: border-color 0.4s, box-shadow 0.4s;
//         }

//         .drum-photo {
//           pointer-events: none;
//           filter: grayscale(calc(1 - var(--focus, 1))) brightness(calc(0.4 + 0.6 * var(--focus, 1)));
//         }

//         .drum-face-shade {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(to top, rgba(5, 11, 34, 0.92), rgba(5, 11, 34, 0.1) 42%, transparent 65%);
//         }

//         .drum-caption {
//           position: absolute;
//           left: 14px;
//           right: 14px;
//           bottom: 12px;
//           margin: 0;
//           font-family: var(--font-member);
//           font-size: clamp(15px, 1.5vw, 19px);
//           font-weight: 700;
//           line-height: 1.1;
//           color: #fff;
//           text-shadow: 0 2px 12px rgba(2, 6, 23, 0.9);
//           opacity: calc(var(--focus, 1) * 0.9);
//         }

//         .drum-card.is-active .drum-caption {
//           opacity: 0;
//           transition: opacity 0.3s;
//         }

//         .drum-card.is-active .drum-face {
//           border-color: rgba(103, 232, 249, 0.85);
//           box-shadow:
//             0 0 0 1px rgba(103, 232, 249, 0.4),
//             0 0 60px rgba(34, 211, 238, 0.4),
//             0 30px 80px rgba(2, 6, 23, 0.7);
//         }

//         .drum-back {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transform: rotateY(180deg);
//           border: 1px solid rgba(148, 190, 255, 0.12);
//           background: linear-gradient(160deg, rgba(14, 40, 80, 0.5), rgba(5, 8, 18, 0.6));
//         }

//         .drum-floor {
//           position: absolute;
//           left: 50%;
//           top: 50%;
//           pointer-events: none;
//           border-radius: 50%;
//           border: 1px dashed rgba(103, 232, 249, 0.4);
//           background: radial-gradient(circle, rgba(34, 211, 238, 0.18), rgba(30, 64, 175, 0.1) 45%, transparent 70%);
//         }

//         .drum-floor::after {
//           content: "";
//           position: absolute;
//           inset: 14%;
//           border-radius: 50%;
//           border: 1px solid rgba(148, 190, 255, 0.14);
//         }

//         .drum-info {
//           flex: none;
//           padding-top: clamp(6px, 1.6vh, 16px);
//         }

//         .drum-info-row {
//           display: grid;
//           grid-template-columns: auto minmax(0, 1fr) auto;
//           align-items: center;
//           gap: clamp(10px, 3vw, 32px);
//         }

//         .drum-info-inner {
//           text-align: center;
//           animation: infoIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
//         }

//         @keyframes infoIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//             filter: blur(5px);
//           }
//           to {
//             opacity: 1;
//             transform: none;
//             filter: none;
//           }
//         }

//         .drum-role {
//           display: inline-flex;
//           max-width: 100%;
//           align-items: center;
//           gap: 10px;
//           border-radius: 999px;
//           border: 1px solid rgba(103, 232, 249, 0.35);
//           background: rgba(34, 211, 238, 0.08);
//           padding: 5px 16px;
//           font-family: var(--font-member);
//           font-size: clamp(0.8rem, 1.3vw, 0.95rem);
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: #cffafe;
//         }

//         .drum-name {
//           margin-top: 0.4rem;
//           font-family: var(--font-member);
//           font-size: clamp(1.9rem, 4.2vw, 3.3rem);
//           font-weight: 700;
//           line-height: 1.02;
//           letter-spacing: -0.01em;
//           color: transparent;
//           background: linear-gradient(180deg, #ffffff 35%, #a5f3fc);
//           -webkit-background-clip: text;
//           background-clip: text;
//           filter: drop-shadow(0 0 22px rgba(34, 211, 238, 0.35));
//         }

//         .drum-meta {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//           margin-top: 0.35rem;
//         }

//         .drum-branch {
//           font-family: var(--font-member);
//           font-size: clamp(1rem, 1.6vw, 1.2rem);
//           font-weight: 500;
//           letter-spacing: 0.01em;
//           color: #cbd5e1;
//         }

//         .drum-meta .icon-link {
//           height: 34px;
//           width: 34px;
//           border-color: rgba(103, 232, 249, 0.45);
//           color: var(--cyan);
//         }

//         .drum-arrow {
//           display: inline-flex;
//           height: 48px;
//           width: 48px;
//           align-items: center;
//           justify-content: center;
//           border-radius: 999px;
//           border: 1px solid rgba(103, 232, 249, 0.4);
//           background: rgba(5, 11, 34, 0.6);
//           color: var(--cyan);
//           cursor: pointer;
//           transition: background 0.3s, color 0.3s, box-shadow 0.3s;
//         }

//         .drum-arrow:hover {
//           background: var(--cyan);
//           color: var(--navy-950);
//           box-shadow: 0 0 26px rgba(103, 232, 249, 0.5);
//         }

//         @media (max-width: 639px) {
//           .drum-arrow {
//             height: 40px;
//             width: 40px;
//           }
//         }

//         .drum-hint {
//           margin-top: 0.3rem;
//           text-align: center;
//           font-family: var(--font-rajdhani), sans-serif;
//           font-size: 11px;
//           letter-spacing: 0.28em;
//           text-transform: uppercase;
//           color: #64748b;
//         }

//         .hint-touch {
//           display: none;
//         }

//         @media (hover: none) {
//           .hint-fine {
//             display: none;
//           }
//           .hint-touch {
//             display: inline;
//           }
//         }

//         .drum-arrow:focus-visible {
//           outline: 2px solid var(--cyan);
//           outline-offset: 3px;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .starfield {
//             animation: none !important;
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           *,
//           *::before,
//           *::after {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             scroll-behavior: auto !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `}</style>

//       {/* HERO (unchanged) */}
//       <section
//         id="alumni-home"
//         className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden">
//           <NetworkBackground />

//           {/* Optional soft background glow */}
//           <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 z-0"
//           style={{
//             background:
//               "radial-gradient(ellipse at 50% 48%, rgba(8,100,160,0.20), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(14,116,144,0.09), transparent 45%)",
//           }}
//           />
//           <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-32 text-center sm:px-8 md:pt-36">
//             <h1 className="hero-reveal hero-delay-1 text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
//               OUR
//               <br />
//               <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
//                 ALUMNI
//               </span>
//             </h1>
//             <p className="hero-reveal hero-delay-2 mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base md:text-lg">
//               Welcome to our Exciting realms of technology, coding, engineering
//               and robotics. Discover, learn and collaborate with like minded
//               individuals, pushing the boundries of innovation.
//             </p>
//           </div>
//       </section>
      

//          {/* ALUMNI BATCH DRUMS */}
//       <section id="alumni-batches" className="relative w-full py-16">
//         <div className="mx-auto w-full">
//           {alumniDrumData.map(({ batch, alumni }) => (
//             <AlumniDrum
//             key={batch}
//             id={`alumni-${batch}`}
//             title={`Batch ${batch}`}
//             description={`Meet our alumni from the batch of ${batch}.`}
//             alumni={alumni}
//             />
//           ))}
//         </div>
//       </section>

//     </main>
//   );
// }



"use client";

import { Orbitron, Rajdhani, Space_Grotesk } from "next/font/google";
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
});

// Used only for alumni names and company.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Linkedin
} from "lucide-react";



const alumniBatches = ["2023", "2022", "2021","2020", "2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007"];

const alumniPhotos = {
  "2023": [
    { filename: "aditya.jpeg", name: "Aditya Raj", linkedin: "https://www.linkedin.com/in/aditya-raj-461a31274" },
    { filename: "amit.jpeg", name: "Amit Gupta", linkedin: "https://www.linkedin.com/in/amitkrgupta31/" },
    { filename: "rishita.jpeg", name: "Rishita Raj", linkedin: "https://www.linkedin.com/in/rishita-raj-836b13290" },
    { filename: "ab.jpg", name: "Ayush Bhagat", linkedin: "https://www.linkedin.com/in/ayush-k-bhagat/" },
    { filename: "kashish.jpeg", name: "Kashish Kumari", linkedin: "https://www.linkedin.com/in/kashish-kumari-898771327/" },
    { filename: "roushan.jpeg", name: "Roushan Raj", linkedin: "https://www.linkedin.com/in/roushan-raj-cmd007/" },
    { filename: "punam.jpeg", name: "Punam Kumari", linkedin: "https://www.linkedin.com/in/punam-kumari-b17b0a282/" },
    { filename: "neeraj.jpeg", name: "Neeraj Kachhap", linkedin: "https://www.linkedin.com/in/neeraj-kachhap-081911303/" },
    { filename: "aakriti.jpeg", name: "Aakriti Paul", linkedin: "https://www.linkedin.com/in/aakriti-paul-04626a316/" },
    { filename: "sakshee.jpg", name: "Sakshee Dubey", linkedin: "https://www.linkedin.com/in/sakshee-dubey-0b3459291/" },
    { filename: "abishek.jpg", name: "Abhishek Prasad", linkedin: "https://www.linkedin.com/in/abhishekprasad09/" },
    { filename: "Anukriti.jpg", name: "Anukriti Kumari", linkedin: "https://www.linkedin.com/in/anukriti-kumari-bb5625290/" },
    { filename: "ankit.jpeg", name: "Ankit Yadav", linkedin: "https://www.linkedin.com/in/ankit-yadav-b95a35290/" },
    { filename: "vishnu.jpg", name: "Vishnu Singh", linkedin: "https://www.linkedin.com/in/vishnu-singh-munda-a88a93290/" },
    { filename: "warsha.jpeg", name: "Warsha Karketta", linkedin: "https://www.linkedin.com/in/warsha840/" },
  ],

  "2022": [
    { filename: "Adarsh.jpg", name: "Adarsh Kumar", linkedin: "https://www.linkedin.com/in/adarsh-kumar-abb0a3259/",company:"" },
    { filename: "Shivam.jpeg", name: "Shivam Singh", linkedin: "https://www.linkedin.com/in/shivamsinghpsss/" ,company:""},
    { filename: "simran.jpeg", name: "Simran", linkedin: "https://www.linkedin.com/in/simran-bb9338258/",company:"" },
    { filename: "Shaswat.jpg", name: "Kumar Shaswat", linkedin: "https://www.linkedin.com/in/kumar-shaswat-3a252a35a/",company:"" },
    { filename: "Anshika.jpeg", name: "Anshika Mishra", linkedin: "https://www.linkedin.com/in/anshika-mishra-2a7641257/",company:"" },
    { filename: "Anjali1.jpg", name: "Anjali Singh", linkedin: "https://www.linkedin.com/in/anjali-singh-58a58b257/",company:"" },
    { filename: "Sashi_s.jpeg", name: "Sashi Sekhar Singh", linkedin: "https://www.linkedin.com/in/sashi-sekhar-singh-858a5424a/",company:"" },
    { filename: "Anjali1.jpg", name: "Anjali Singh", linkedin: "https://www.linkedin.com/in/anjali-singh-58a58b257/",company:"" },
    { filename: "Rudra.jpg", name: "Rudranil Ganguly", linkedin: "https://www.linkedin.com/in/rudranil-ganguly-305411254/",company:"" },
    { filename: "Aquib.jpg", name: "Aquib Aftab", linkedin: "https://www.linkedin.com/in/aquib-aftab-65917b252/",company:"" },
    { filename: "Deepti.jpeg", name: "Deepti Kumari", linkedin: "https://www.linkedin.com/in/deepti-kumari-482049258/",company:"" },
    { filename: "Mayank1.jpeg", name: "Kumar Mayank", linkedin: "https://www.linkedin.com/in/kumar-mayank-410660221/",company:"" },
    { filename: "Rahul.jpg", name: "Rahul Kumar Das", linkedin: "https://www.linkedin.com/in/rahul-das-169596258/",company:"" },
    { filename: "Faizan.jpg", name: "Faizan Ahmad", linkedin: "https://www.linkedin.com/in/faizan-ahmad-full-stack/" ,company:""},
    { filename: "Puspam.png", name: "Puspam Jha", linkedin: "https://www.linkedin.com/in/puspam-jha-44606a225/",company:"" },
    
    { filename: "sonali.png", name: "Sonali Gorai", linkedin: "https://www.linkedin.com/in/sonali-gorai-b0a631264/" ,company:""},
  ],

  "2021": [
    { filename: "Priyanshu.jpg", name: "Priyanshu Mukherjee", linkedin: "https://www.linkedin.com/in/mukherjee-priyanshu/" ,company:"XLRI Jamshedpur"},
    { filename: "Rohit_iete.jpg", name: "Rohit Kumar Grihi", linkedin: "https://www.linkedin.com/in/rohit-kumar-grihi/",company:"Pi42" },
    { filename: "Saron.jpg", name: "Saron Mukti Ekka", linkedin: "https://www.linkedin.com/in/saron-ekka/",company:"IIM Bangalore" },
    { filename: "ADARSH_IETE.jpg", name: "Adarsh Trivedi", linkedin: "https://www.linkedin.com/in/adarsh-trivedi-10ba6a22a/",company:"Yamaha Motor Solutions India" },
    { filename: "Supriya.jpg", name: "Supriya Sharma", linkedin: "https://www.linkedin.com/in/supriya-sharma-6a2057225/",company:"Nalco water India private limited, an Ecolab Company" },
    { filename: "RAHUL_KR_IETE.jpg", name: "Rahul Kumar", linkedin: "https://www.linkedin.com/in/rahul-kumar-4b133a23b/recent-activity/all/",company:"TCS" },
    { filename: "Deepak.jpg", name: "Deepak Kumar", linkedin: "https://www.linkedin.com/in/deepak-kumar-052779225/",company:"StampMyVisa" },
    { filename: "Ankita.jpg", name: "Ankita Ghosh", linkedin: "https://www.linkedin.com/in/ankitag39/",company:"TCS" },
    { filename: "Avinash.jpeg", name: "Avinash Yadav", linkedin: "https://www.linkedin.com/in/beyond-avinash/",company:"Youtube Growth Partner @Starter Story" },
    { filename: "Mehar.jpg", name: "Mehar Talat", linkedin: "https://www.linkedin.com/in/mehartalat/",company:"Bokaro Steel Limited, SAIL" },
    { filename: "Rahul_J.jpg", name: "Rahul Jha", linkedin: "https://www.linkedin.com/in/jharahul28/",company:"GlobalLogic" },
    { filename: "Rishita.jpg", name: "Rishita Dutta", linkedin: "https://www.linkedin.com/in/rishita-dutta-24a91824a/",company:"JSW" },
    { filename: "Ayushi.jpeg", name: "Ayushi Tewary", linkedin: "https://www.linkedin.com/in/ayushi-tewary-922ba5253/",company:"Tata Hitachi Construction Machinery Company Private " },
    { filename: "Ashish.jpg", name: "Ashish Sinha", linkedin: "https://www.linkedin.com/in/ashish-kumar-sinha-82215124a/",company:"Shree Cement Ltd." }
    
  ],

  "2020": [
  { filename: "rajat.png",name: "Rajat Choudhary",linkedin: "https://www.linkedin.com/in/rajat1908/",company:"GlobalLogical Hitachi"},
  { filename: "mukund.png",name: "Mukund Parashar",linkedin: "https://www.linkedin.com/in/mukund-prashar-4a9168214/",company:"Tata Steel"},
  { filename: "megha.png",name: "Megha",linkedin: "https://www.linkedin.com/in/megha-singh-5a8ba41bb/",company:"TCS Digital"},
  { filename: "randeep.png",name: "Rana Randeep",linkedin: "https://www.linkedin.com/in/rana-randeep-ab0aa0202/",company:"Vedanta"},
  { filename: "muskan.png",name: "Muskan Naaz",linkedin: "https://www.linkedin.com/in/muskan-naaz-a112ba208/",company:"HUL"},
  { filename: "sandeep.png",name: "Sandeep Kr. Hembrom",linkedin: "https://www.linkedin.com/in/sandeephembrom/",company:"TCS Ninja"},
  { filename: "shreya.png",name: "Shreya Prabha",linkedin: "https://www.linkedin.com/in/shreya-prabha-897b27197/",company:"Technip Energies"},
  { filename: "vijay.png",name: "Vijay Lowada",linkedin: "https://www.linkedin.com/in/vijay2002/",company:"TCS Ninja"},
  { filename: "vaidehi.png", name: "Vaidehi Singh",linkedin: "https://www.linkedin.com/in/vaidehi-singh-a73186207/",company:"Tata Steel"},
  { filename: "avinav.png",name: "Avinav Raj Singh",linkedin: "https://www.linkedin.com/in/avinav-raj-632641207/",company:"Ecolab" },
  { filename: "aman.png",name: "Aman Kr. Singh",linkedin: "https://www.linkedin.com/in/aman-singh-rajput-1b6b351bb/",company:"TCS Digital"},
  { filename: "ruma.png", name: "Ruma Rupal",linkedin: "https://www.linkedin.com/in/ruma-rupal-56aa56236/",company:"Higher Studies" },
  { filename: "=aniket.png", name: "Aniket Kr. Gupta",linkedin: "https://www.linkedin.com/in/aniket-kumar-gupta-4469a1213/",company:"Tata Steel" },
  { filename: "manisha.png", name: "Manisha Kumari",linkedin: "https://www.linkedin.com/in/manisha-kumari-3a022a217/",company:"Tata Steel" },
],


  "2019": [
    { filename: "Harsha.jpg", name: "Harsha Sinha", linkedin: "https://www.linkedin.com/in/harsha-sinha-9a51601a1/",company:"AMNS" },
    { filename: "Himanshu.jpg", name: "Himanshu Jaiswal", linkedin: "https://www.linkedin.com/in/himanshu-jaiswal-889771197/",company:"Global Logic" },
    
    { filename: "Shubhangi.jpg", name: "Shubhangi Anand", linkedin: "https://www.linkedin.com/in/shubhangi-anand/",company:"JSW" },
    { filename: "Dhiraj.jpg", name: "Dhiraj Pandey", linkedin: "https://www.linkedin.com/in/dhiraj-pandey-007bitsindri/" ,company:"L&T"},
    { filename: "Laxmi.jpg", name: "Lakshmi Sharma", linkedin: "https://www.linkedin.com/in/laxmi-sharma-84806a1b3/",company:"Vedanta" },
    { filename: "Abhishek.jpg", name: "Abhishek Ranjan", linkedin: "https://www.linkedin.com/in/abhishek-ranjan-690a63195/",company:"IIT Madras" },
    { filename: "AnjaliK.jpg", name: "Anjali Kumari", linkedin: "https://www.linkedin.com/in/anjali-kumari-6677421a7/",company:"EXAVALU" },
    { filename: "Harshit.jpg", name: "Harshit Pallove", linkedin: "https://www.linkedin.com/in/harshit-pallove-a39505193/" ,company:"Capgemini"},
    { filename: "Simran.jpg", name: "Simran", linkedin: "https://www.linkedin.com/in/simran-125152197/" ,company:"AMNS"},
    { filename: "Ayush.jpg", name: "Ayush Vijayant", linkedin: "https://www.linkedin.com/in/ayush-vijayant-606566198",company:"TCS Digital" },
    { filename: "Taniya.jpg", name: "Taniya Kumari", linkedin: "https://www.linkedin.com/in/taniya-kumari-a997441a7/",company:"JSW" },
    { filename: "Ravi.jpg", name: "Ravi Kumar", linkedin: "https://www.linkedin.com/in/ravi-kumar-62bb6b158/",company:"TCS NINJA" },
    { filename: "Juhi.jpg", name: "Juhi Sinha", linkedin: "https://www.linkedin.com/in/juhi-sinha-8959981b3/",company:"S.K/SAMANTA & Co(P)Ltd." },
    { filename: "AnjaliP.jpg", name: "Anjali Priya", linkedin: "https://www.linkedin.com/in/anjali-priya-4235571a7/",company:"Technip Energies" },
    
  ],

  "2018": [
  { filename: "abhishek.png",name: "Abhishek Pandey",linkedin: "https://www.linkedin.com/in/abhishekpandey921/",company:"Samsung"},
  { filename: "abhijeet.png",name: "Abhijit Parashar",linkedin: "https://www.linkedin.com/in/abhijit-parashar-811b34112/",company:"Vedanta"},
  { filename: "nidhi.png",name: "Nidhi Kumari",linkedin: "https://www.linkedin.com/in/nidhi-kumari-a4ba70198/",company:"Deloitte"},
  { filename: "rumman.png",name: "Rumman Akhtar",linkedin: "https://www.linkedin.com/in/rummanakhtar/",company:"Cognizant"},
  { filename: "roshan.png",name: "Roshan Kumar Singh",linkedin: "https://www.linkedin.com/in/roshan-kumar-singh/",company:"Samsung"},
  { filename: "kiran.png",name: "Kiran Kumari",linkedin: "https://www.linkedin.com/in/kiran-kumari-k99/",company:"Deloitte"},
  { filename: "shailesh.png", name: "Shailesh Anand",linkedin: "https://www.linkedin.com/in/shailesh-aanand/",company:"Google"},
  { filename: "pallavi.png",name: "Pallavi Singh",linkedin: "https://www.linkedin.com/in/priyapp/",company:"Schlumberger"},
  { filename: "deepak.png",name: "Deepak Kumar",linkedin: "https://www.linkedin.com/in/deepak7870/",company:"Deloitte"},
  { filename: "suraj.png",name: "Suraj Kumar Mahato",linkedin: "https://www.linkedin.com/in/suraj-sloth/",company:"NPCI"},
  { filename: "",name: "Anjali Singh",linkedin: "https://www.linkedin.com/in/anjali-singh-506502215/",company:"PI Industry" },
  { filename: "subhabrata.png", name: "Subhabrata Roy",linkedin: "https://www.linkedin.com/in/subhabrata-roy-84038b180/" ,company:"L&T"},
  { filename: "deepak.png",name: "Deepak Kumar",linkedin: "https://www.linkedin.com/in/deepak7870/",company:"Deloitte"},

],

"2017": [
  { filename: "saurav.png",name: "Saurav Tiwary",linkedin: "https://www.linkedin.com/in/saurav-tiwary-bb022214a/",company:"Tata Steel"},
  { filename: "kanish.png",name: "Kanish Dubey",linkedin: "https://www.linkedin.com/in/kanish-dubey-94610a169/",company:"JSW Steel Ltd."},
  { filename: "shweta.png",name: "Shweta Singh",linkedin: "https://www.linkedin.com/in/sweta-singh-5b6105194/",company:"TCS"},
  { filename: "siddharth.png",name: "Siddharth Gupta",linkedin: "https://www.linkedin.com/in/sidharth19th/",company:"Girikon"},
  { filename: "priya.png",name: "Priya Saluja",linkedin: "https://www.linkedin.com/in/priya-saluja-0627791b2/",company:"TCS"},
  { filename: "roshan.png",name: "Roshan Singh",linkedin: "https://www.linkedin.com/in/roshan-singh-ba8965170/",company:"Samsung"},
  { filename: "rashi.png",name: "Rashi Agrawal",linkedin: "https://www.linkedin.com/in/rashi-agarwal-778025174/",company:"Treasurer"},
  { filename: "abhishek.png",name: "Abhishek Ranjan",linkedin: "https://www.linkedin.com/in/ranjan17abhishek/",company:"Tata Steel"},
  { filename: "pallav.png",name: "Pallav Tiriyar",linkedin: "https://www.linkedin.com/in/pallav-tiriyar-0aa09b15a/",company:"Deloitte"},
  { filename: "reema.png",name: "Reema Bharti",linkedin: "https://www.linkedin.com/in/reema-bharti-745793168/",company:"Schlumberger"},
  { filename: "alice.png",name: "Alice Laguri",linkedin: "https://www.linkedin.com/in/alice-laguri-4827b6148/",company:"TCS" },
  { filename: "nilesh.png", name: "Nilesh Tiwary",linkedin: "linkedin.com" ,company:"LTD"},

],

"2016": [
  { filename: "pratyush.png",name: "Pratyush Prasad",linkedin: "https://www.linkedin.com/in/pratyush-prasad-62702013b/",company:"Tata Steel"},
  { filename: "abhishek.png",name: "Abhishek Ranjan Tiwary",linkedin: "https://www.linkedin.com/in/abhishek-ranjan-tiwary-318951147/",company:"Tata Power"},
  { filename: "shweta.png",name: "Shweta Gupta",linkedin: "linkedin.com",company:"Sify Technology"},
  { filename: "shivank.png",name: "Shivank Jaiswal",linkedin: "linkedin.com",company:"Higher Studies"},
  { filename: "shiwani.png",name: "Shiwani Kumari",linkedin: "https://www.linkedin.com/in/shiwani-kumari-a46027145/",company:"Healthplix"},
  { filename: "shivam.png",name: "Shivam",linkedin: "linkedin.com",company:"JSW Steel Ltd."},
  { filename: "puja.png",name: "Puja Singh",linkedin: "linkedin.com",company:"Ericsson"},
  { filename: "sayeesta.png",name: "Sayeesta Samrin",linkedin: "https://www.linkedin.com/in/sayeesta-samrin-3a509a14b/",company:"TCS"},
  { filename: "priyanka.png", name: "Priyanka Tirkey",linkedin: "linkedin.com",company:"Media Head & PRO"},
  { filename: "pushpendra.png",name: "Pushpendra Kumar Singh",linkedin: "linkedin.com",company:"Tata Steel"},
],

"2015": [
  { filename: "subham.png",name: "Subham Bose",linkedin: "https://www.linkedin.com/in/subham-bose/",company:"IIM Nagpur"},
  { filename: "kundan.png",name: "Kundan Kumar",linkedin: "linkedin.com",company:"Wipro"},
  { filename: "rajeev.png",name: "Rajeev Ranjan Raj",linkedin: "https://www.linkedin.com/in/rajeev-ranjan-raj-14a414121",company:"Tata Steel"},
  { filename: "",name: "Naveen kumar",linkedin: "https://www.linkedin.com/in/naveenkumar227",company:"Cognizant"},
  { filename: "abhishek.png",name: "Abhishek Tiwari",linkedin: "https://in.linkedin.com/in/abhishek-tiwari-b0b3b83a/",company:"Wipro"},
  { filename: "srijan.png",name: "Srijan Bharadwaj",linkedin: "https://www.linkedin.com/in/srijan-bharadwaj-497366211/",company:"TCS"},
  { filename: "",name: "Saket Kumar",linkedin: "linkedin.com",company:"Salesforce"},
  { filename: "", name: "Jyoti Singh",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Anupriya Sheetu",linkedin: "https://www.linkedin.com/in/anupriya-sheetu-11668015a/",company:"Design Team"},
  { filename: "",name: "Kaushik Nilay",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Sushmit Anshu",linkedin: "linkedin.com",company:"" },
  { filename: "", name: "Badal Sahu",linkedin: "linkedin.com" ,company:""},
  { filename: "", name: "Vivek Sahu",linkedin: "linkedin.com" ,company:""},
  { filename: "", name: "Kumar Vishist",linkedin: "https://www.linkedin.com/in/kumar-vishist-2005bb124/" ,company:""},

],

"2014": [
  { filename: "niraj.png",name: "Niraj Kumar",linkedin: "https://www.linkedin.com/in/niraj-kumar-28b774134/",company:"NIT Jamshedpur"},
  { filename: "nitya.png",name: "Nitya Agrawal",linkedin: "linkedin.com",company:"Nagra Vision Ltd."},
  { filename: "sudhanshu.png",name: "Sudhanshu Ambastha",linkedin: "https://www.linkedin.com/in/sudhanshu-ambastha/",company:"bloomreach.png"},
  { filename: "arvind.png",name: "Arvind Marandi",linkedin: "linkedin.com",company:"IIT Kanpur"},
  { filename: "himanshu.png",name: "Himanshu Harsh",linkedin: "linkedin.com",company:"IIM Visakhapatnam"},
  { filename: "navtosh.png",name: "Navtosh Arun",linkedin: "https://in.linkedin.com/in/navtosh-arun/",company:"Preparing for UPSC Exam"},
  { filename: "parimal.png",name: "Parimal Roy",linkedin: "linkedin.com",company:"Rakuten"},
  { filename: "kritee.png", name: "Kritee Rani",linkedin: "linkedin.com",company:"Datta Meghe Institute of MSci."},
  { filename: "ashish.png",name: "Ashish Saw",linkedin: "https://www.linkedin.com/in/ashish-kumar-saw-ab2b9212a/",company:"Icici securities"},
  

],

"2013": [
  { filename: "",name: "Akash Vaibhav",linkedin: "https://www.linkedin.com/in/akashvbhv/",company:"STMicroelectronics"},
  { filename: "vikas.png",name: "Vikash Kumar",linkedin: "linkedin.com",company:"Indian Railways"},
  { filename: "",name: "Akshay Aanand",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Soni Kumari",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Manisha Kumari",linkedin: "linkedin.com",company:"Spice jet"},
  { filename: "",name: "Saket Bharti",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Avinash Kumar Singh",linkedin: "inkedin.com",company:"Spice jet"},
  { filename: "", name: "Puja Burnwal",linkedin: "inkedin.com",company:"Spice jet"},
  { filename: "",name: "Sandeep Sinku",linkedin: "inkedin.com",company:""},
  { filename: "",name: "Saif Ansari",linkedin: "inkedin.com",company:"" },


],

"2012": [
  { filename: "",name: "Shubham Satyam",linkedin: "https://www.linkedin.com/in/shubham-satyam-9702361ba/",company:"Deloitte"},
  { filename: "",name: "Priyanka Barik",linkedin: "https://www.linkedin.com/in/priyanka-barik-260809a5/",company:"Blue Yonder"},
  { filename: "",name: "Rishikant Yadav",linkedin: "https://www.linkedin.com/in/rishikant-yadav-115b99101/",company:"NTPC Limited"},
  { filename: "",name: "Sumit Kumar",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Sonali Bhagat",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Roushan Sharma",linkedin: "https://www.linkedin.com/in/roushan-sharma-62aa97120/",company:"Signal & Telecom,Indian Railways"},
  { filename: "",name: "Jagit Singh Dhadial",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Monika Raj",linkedin: "https://www.linkedin.com/in/monikaraj311/",company:"Speridian Technologies"},
  { filename: "",name: "Dharmendar Kumar",linkedin: "https://www.linkedin.com/in/dharmendar-kumar-8a4538100/",company:"Infosys"},
  { filename: "",name: "Sudarshan Arya",linkedin: "https://www.linkedin.com/in/sudarshan366arya",company:""},
  { filename: "",name: "Sumit Kumar",linkedin: "https://www.linkedin.com/in/sumit-kumar-625649158/",company:"Cognizant" },
  { filename: "",name: "Ruhi Pandey",linkedin: "https://www.linkedin.com/in/ruhipandey1729" ,company:"Rapyd"},
  { filename: "",name: "Rakesh Kumar",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Uttam Kushwaha",linkedin: "https://www.linkedin.com/in/uttam-kushwaha/",company:""},



],

"2011": [
  { filename: "",name: "Sumit",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Abhishek Vipalvi",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Saima",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Nitin",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Parwez 5",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Saurav",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Surbhi",linkedin: "linkedin.com",company:""},
  { filename: "", name: "Manish Kumar",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Sanket",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Suruchi",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Latika",linkedin: "linkedin.com",company:"" },
  { filename: "", name: "Neha",linkedin: "linkedin.com" ,company:""},
  { filename: "", name: "Suraj",linkedin: "linkedin.com" ,company:""},

],

"2010": [
  { filename: "",name: "Chandan Chirag",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Panakaj Narayan",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Anuja",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Niket",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Himanshu",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Smriti Rani",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Sumit Kumar",linkedin: "linkedin.com",company:""},
  { filename: "", name: "Sunita",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Mayank Shekar",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Amrita Singh",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Puja",linkedin: "linkedin.com",company:"" },
  { filename: "", name: "Shubhashish",linkedin: "linkedin.com" ,company:""},
  { filename: "",name: "Gaurav",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Ekta",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Gaurav Kumar",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Annu Preeti",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Abhishek",linkedin: "linkedin.com",company:""},


],

"2009": [
  { filename: "",name: "Manish",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Ranjan",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Shiv Shankar Tiwari",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Sumit Sahu",linkedin: "linkedin.com",company:""},
  
],

"2008": [
  { filename: "",name: "Praveen Kumar",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Sashi Shekar",linkedin: "linkedin.com",company:""},

],

"2007": [
  { filename: "",name: "Digvijay Kumar",linkedin: "linkedin.com",company:""},
  { filename: "",name: "Sapna Kumari",linkedin: "linkedin.com",company:""},

],

};

const alumniDrumData = alumniBatches.map((batch) => ({
  batch,
  alumni: (alumniPhotos[batch] || []).map((person) => ({
    ...person,
    image: `/Alumni/2k${batch.slice(2)}/${person.filename}`,
  })),
}));


function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const section = canvas.parentElement;
    if (!section) return;

    let animationFrame;
    let width = 0;
    let height = 0;
    let dots = [];
    let time = 0;

    const cursor = { x: -1000, y: -1000, active: false };

    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(22, Math.floor((width * height) / 20000));

      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.35 + 0.2,
        driftX: (Math.random() - 0.5) * 0.12,
        driftY: (Math.random() - 0.5) * 0.12,
      }));
    };

    const handlePointerMove = (event) => {
      const rect = section.getBoundingClientRect();
      cursor.x = event.clientX - rect.left;
      cursor.y = event.clientY - rect.top;
      cursor.active = true;
    };

    const handlePointerLeave = () => {
      cursor.active = false;
    };

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const cursorRadius = Math.min(width, height) * 0.24;

      if (cursor.active) {
        const glow = ctx.createRadialGradient(
          cursor.x, cursor.y, 0,
          cursor.x, cursor.y, cursorRadius
        );

        glow.addColorStop(0, "rgba(75, 177, 224, 0.16)");
        glow.addColorStop(0.5, "rgba(75, 177, 224, 0.06)");
        glow.addColorStop(1, "rgba(75, 177, 224, 0)");

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      const maxDistance = Math.min(width, height) * 0.32;

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];

        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance >= maxDistance) continue;

          const proximity = 1 - distance / maxDistance;
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;

          let opacity = proximity * 0.12;
          let color = "105, 157, 184";

          if (cursor.active) {
            const cursorDistance = Math.hypot(
              midX - cursor.x,
              midY - cursor.y
            );
            const influence = Math.max(
              0,
              1 - cursorDistance / cursorRadius
            );

            opacity += influence * 0.38;

            if (influence > 0.05) color = "103, 205, 245";
          }

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${color}, ${Math.min(opacity, 0.65)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      dots.forEach((dot) => {
        dot.x += dot.driftX;
        dot.y += dot.driftY;

        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;

        const pulse = (Math.sin(time * dot.speed + dot.phase) + 1) / 2;

        let opacity = 0.18 + pulse * 0.22;
        let radius = dot.radius;
        let color = "133, 183, 207";

        if (cursor.active) {
          const distance = Math.hypot(
            dot.x - cursor.x,
            dot.y - cursor.y
          );
          const influence = Math.max(
            0,
            1 - distance / cursorRadius
          );

          opacity += influence * 0.45;
          radius += influence * 1.1;

          if (influence > 0.1) color = "145, 224, 255";
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${Math.min(opacity, 0.95)})`;
        ctx.fill();
      });

      if (cursor.active) {
        const nearbyDots = dots
          .map((dot) => ({
            dot,
            distance: Math.hypot(
              dot.x - cursor.x,
              dot.y - cursor.y
            ),
          }))
          .filter(({ distance }) => distance < cursorRadius)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 7);

        nearbyDots.forEach(({ dot, distance }) => {
          const opacity = (1 - distance / cursorRadius) * 0.42;

          ctx.beginPath();
          ctx.moveTo(cursor.x, cursor.y);
          ctx.lineTo(dot.x, dot.y);
          ctx.strokeStyle = `rgba(103, 205, 245, ${opacity})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        });
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(section);

    window.addEventListener("resize", resizeCanvas);
    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="network-background-canvas"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION HEADING (unchanged)                                        */
/* ------------------------------------------------------------------ */

function SectionHeading({ eyebrow, title, description }) {
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    const element = headingRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (!entry.isIntersecting) {
          setTypedTitle("");
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    setTypedTitle("");

    const typingTimer = setInterval(() => {
      index++;
      setTypedTitle(title.slice(0, index));

      if (index >= title.length) {
        clearInterval(typingTimer);
      }
    }, 55);

    return () => clearInterval(typingTimer);
  }, [isVisible, title]);

  return (
    <div
      ref={headingRef}
      className="section-heading mb-10 text-center"
    >
      {eyebrow && (
        <p
          className={`section-subtitle mb-3 text-xs font-bold uppercase tracking-[0.32em] text-cyan-300 ${
            isVisible ? "section-fade-in" : "section-hidden"
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2 className="section-title text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        <span>{typedTitle}</span>
        <span className="typing-cursor">|</span>
        <span className="text-cyan-300">.</span>
      </h2>

      {description && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base ${
            isVisible ? "section-fade-in description-delay" : "section-hidden"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SHARED PIECES                                                      */
/* ------------------------------------------------------------------ */


function Portrait({ alumni, className = "", eager = false }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);
  const initials = alumni.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  // Catches images that failed before React hydrated (onError never fires for those).
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        className={`portrait-fallback flex items-center justify-center ${className}`}
      >
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={alumni.image}
      alt={alumni.name}
      loading={eager ? "eager" : "lazy"}
      draggable={false}
      onError={() => setFailed(true)}
      className={`object-cover object-center ${className}`}
    />
  );
}

function LinkedInButton({ alumni, compact = false }) {
  if (!alumni?.linkedin) return null;
  return (
    <a
      href={alumni.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${alumni.name}'s LinkedIn profile`}
      className={compact ? "icon-link" : "cta-link"}
    >
      {!compact && <span>LinkedIn</span>}
      <span aria-hidden="true" className="font-extrabold text-[16px] tracking-tight"> in </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  THE DRUM — used for every team                                     */
/*  Each team sits on a 3D rotating ring that fits in one screen.      */
/*  Scrolling up/down moves through the page as normal; scrolling      */
/*  sideways (trackpad / shift + wheel), dragging, swiping, the arrow  */
/*  keys or the arrow buttons turn the ring. Whoever faces you is lit  */
/*  up and their details appear underneath automatically.             */
/* ------------------------------------------------------------------ */

const mod = (a, n) => ((a % n) + n) % n;
const PX_PER_MEMBER = 140; // sideways scroll distance that turns one person

function AlumniDrum({ id, title, description, alumni, showRole = false }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const drumRef = useRef(null);
  const cardRefs = useRef([]);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const loopRef = useRef(null);
  const activeRef = useRef(-1);
  const dragRef = useRef(null);
  const draggedRef = useRef(false);
  const snapTimer = useRef(0);
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState({ w: 1280, h: 460 });

  const n = alumni.length;
  const step = n > 0 ? 360 / n : 0;
  const tanStep = Math.tan(Math.PI / Math.max(3, n));
  const isSmall = stage.w < 640;
  const byHeight = (stage.h - 56) / 1.32;
  const byWidth = (2 * stage.w * (isSmall ? 1.3 : 0.64) * tanStep) / 1.08;
  const cardW = Math.round(
    Math.max(120, Math.min(340, byHeight, byWidth, stage.w * (isSmall ? 0.62 : 0.58)))
  );
  const cardH = Math.round(cardW * 1.32);
  const radius =
    n >= 3
      ? Math.round((cardW / 2 / tanStep) * 1.08)
      : Math.round(cardW * 0.9);
  const perspective = Math.round(Math.max(1100, radius * 2.6));
  cardRefs.current.length = n;

  // Measure the space the ring is allowed to use so everything fits on screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const apply = useCallback(
    (pos) => {
      const drum = drumRef.current;
      if (!drum || n === 0) return;
      const angle = pos * step;
      // The tilt pushes the front card down by radius·sin(6°); lift it back to centre.
      const lift = radius * Math.sin((6 * Math.PI) / 180);
      drum.style.transform = `translateY(${-lift}px) translateZ(${-radius}px) rotateX(-6deg) rotateY(${-angle}deg)`;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rel = ((((i * step - angle) % 360) + 540) % 360) - 180;
        const facing = Math.cos((rel * Math.PI) / 180);
        card.style.setProperty("--focus", (Math.max(0, facing) ** 3).toFixed(3));
      });

      const index = mod(Math.round(pos), n);
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    },
    [n, step, radius]
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const tick = () => {
      const diff = targetRef.current - posRef.current;
      posRef.current =
        reduceMotion || Math.abs(diff) < 0.0005
          ? targetRef.current
          : posRef.current + diff * 0.13;
      apply(posRef.current);
      rafRef.current =
        posRef.current === targetRef.current ? 0 : requestAnimationFrame(tick);
    };
    loopRef.current = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };
    activeRef.current = -1;
    apply(posRef.current);
    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [apply]);

  const goTo = useCallback((t) => {
    targetRef.current = t;
    loopRef.current?.();
  }, []);

  const shift = (by) => goTo(Math.round(targetRef.current) + by);

  const jumpTo = (i) => {
    const cur = Math.round(targetRef.current);
    let d = mod(i - cur, n);
    if (d > n / 2) d -= n;
    goTo(cur + d);
  };

  // Sideways scrolling turns the ring; up/down scrolling is left to the page.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || n === 0) return;
    const onWheel = (e) => {
      let dx = e.deltaX;
      if (e.shiftKey && Math.abs(dx) < 1) dx = e.deltaY;
      const sideways = e.shiftKey || Math.abs(dx) > Math.abs(e.deltaY);
      if (!sideways || Math.abs(dx) < 0.5) return;
      e.preventDefault();
      const px = e.deltaMode === 1 ? dx * 32 : e.deltaMode === 2 ? dx * 400 : dx;
      goTo(targetRef.current + px / PX_PER_MEMBER);
      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(
        () => goTo(Math.round(targetRef.current)),
        140
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(snapTimer.current);
    };
  }, [n, goTo]);

  // Drag (mouse) or swipe (touch) sideways to turn the ring.
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    draggedRef.current = false;
    dragRef.current = {
      x: e.clientX,
      start: targetRef.current,
      moved: false,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
    };
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      draggedRef.current = true;
      stageRef.current?.setPointerCapture?.(e.pointerId);
    }
    const now = performance.now();
    const dt = Math.max(1, now - d.lastT);
    d.v = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.v;
    d.lastX = e.clientX;
    d.lastT = now;
    goTo(d.start - dx / (cardW * 0.9));
  };

  const onPointerUp = () => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d || !d.moved) return;
    const fling = Math.max(-3, Math.min(3, (-d.v * 160) / (cardW * 0.9)));
    goTo(Math.round(targetRef.current + fling));
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      shift(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      shift(-1);
    }
  };

  if (n === 0) return null;
  const currentIndex = Math.min(active, n - 1);
  const current = alumni[currentIndex];

  return (
    <section
      ref={sectionRef}
      id={id}
      className="drum-section border-t border-white/[0.07]"
    >
      <div aria-hidden="true" className="starfield" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading title={title} description={description} />
      </div>

      <div
        ref={stageRef}
        className="drum-stage"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${title}: use the left and right arrow keys to turn`}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ perspective: `${perspective}px` }}
      >
        <div
          ref={drumRef}
          className="drum"
          style={{ width: cardW, height: cardH }}
        >
          <div
            aria-hidden="true"
            className="drum-floor"
            style={{
              width: radius * 2 + cardW,
              height: radius * 2 + cardW,
              marginLeft: -(radius + cardW / 2),
              marginTop: -(radius + cardW / 2),
              transform: `translateY(${cardH / 2 + 22}px) rotateX(90deg)`,
            }}
          />

          {alumni.map((alumni, i) => (
            <div
              key={`${id}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => {
                if (!draggedRef.current) jumpTo(i);
              }}
              className={`drum-card ${i === currentIndex ? "is-active" : ""}`}
              style={{
                width: cardW,
                height: cardH,
                transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="drum-face">
                <Portrait alumni={alumni} className="drum-photo h-full w-full" eager />
                <div className="drum-face-shade" />
                <p className="drum-caption">{alumni.name}</p>
              </div>
              <div aria-hidden="true" className="drum-back" />
            </div>
          ))}
        </div>
      </div>

      <div className="drum-info relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8">
        <div className="drum-info-row">
          <button
            type="button"
            className="drum-arrow"
            aria-label="Previous member"
            onClick={() => shift(-1)}
          >
            <ChevronLeft size={22} />
          </button>

          <div key={current.name} className="drum-info-inner" aria-live="polite">
            {/*{showRole && current.role && (
              <p className="drum-role">{current.role}</p>
            )}*/}
            <h3 className="drum-name">{current.name}</h3>
            {current.company && (
              <p className="drum-branch">{current.company}</p>
            )}
            <div className="drum-meta">
              {/*<span className="drum-branch">{current.branch}</span>*/}
              <LinkedInButton alumni={current} compact />
            </div>
          </div>

          <button
            type="button"
            className="drum-arrow"
            aria-label="Next member"
            onClick={() => shift(1)}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* <p className="drum-hint">
          <span className="hint-fine">Scroll sideways, drag or use the arrows to spin</span>
          <span className="hint-touch">Swipe sideways to spin</span>
        </p> */}
      </div>
    </section>
  );
}

export default function MembersPage() {
  return (
    <main
      className={`${orbitron.variable} ${rajdhani.variable} ${spaceGrotesk.variable} members-page relative isolate min-h-screen overflow-x-clip bg-[#050812] text-white`}>
      <Navbar />

      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 0;
        }

        body {
          margin: 0;
          background: #050812;
        }

        .font-display {
          font-family: var(--font-rajdhani), sans-serif;
        }

        .section-title {
          font-family: var(--font-orbitron), sans-serif;
          font-weight: 700;
          letter-spacing: 0.025em;
          text-transform: uppercase;
          text-shadow: 0 0 24px rgba(34, 211, 238, 0.12);
        }

        .section-subtitle,
        .section-heading p {
          font-family: var(--font-rajdhani), sans-serif;
        }

        .section-hidden {
          opacity: 0;
          transform: translateY(18px);
        }

        .section-fade-in {
          animation: sectionFadeIn 0.7s ease-out both;
        }

        .description-delay {
          animation-delay: 0.15s;
        }

        .typing-cursor {
          display: inline-block;
          margin-left: 3px;
          color: #67e8f9;
          animation: cursorBlink 0.7s steps(2, start) infinite;
        }

        @keyframes sectionFadeIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cursorBlink {
          to {
            visibility: hidden;
          }
        }

        .network-background-canvas {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-reveal {
          animation: heroReveal 0.9s ease-out both;
        }

        .hero-delay-1 {
          animation-delay: 0.15s;
        }

        .hero-delay-2 {
          animation-delay: 0.3s;
        }

        /* ---------- navy theme for everything below the hero ---------- */
        .alumni-page {
          --navy-950: #050b22;
          --navy-900: #071233;
          --navy-850: #0a173f;
          --navy-800: #0f1f4f;
          --navy-line: rgba(148, 190, 255, 0.12);
          --cyan: #67e8f9;
          --cyan-strong: #22d3ee;
          --nav-offset: 100px;
          --font-alumni: var(--font-space-grotesk), "Space Grotesk", sans-serif;
        }

        @media (max-width: 767px) {
          .members-page {
            --nav-offset: 84px;
          }
        }

        .portrait-fallback {
          background:
            radial-gradient(circle at 30% 25%, rgba(103, 232, 249, 0.35), transparent 55%),
            linear-gradient(160deg, #13286b, #081236);
          color: #cffafe;
          font-family: var(--font-orbitron), sans-serif;
          font-weight: 700;
          letter-spacing: 0.08em;
          font-size: clamp(0.8rem, 2.4vw, 1.6rem);
        }

        .starfield {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(1px 1px at 12px 24px, rgba(255, 255, 255, 0.55), transparent 60%),
            radial-gradient(1px 1px at 90px 140px, rgba(186, 230, 253, 0.5), transparent 60%),
            radial-gradient(1.5px 1.5px at 170px 70px, rgba(103, 232, 249, 0.55), transparent 60%),
            radial-gradient(1px 1px at 230px 210px, rgba(255, 255, 255, 0.4), transparent 60%);
          background-size: 260px 260px;
          animation: twinkle 6s ease-in-out infinite;
          opacity: 0.55;
        }

        @keyframes twinkle {
          50% {
            opacity: 0.25;
          }
        }

        .cta-link {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          gap: 0.5rem;
          border-radius: 999px;
          border: 1px solid rgba(103, 232, 249, 0.4);
          background: rgba(34, 211, 238, 0.06);
          padding: 0.65rem 1.15rem;
          font-family: var(--font-rajdhani), sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #cffafe;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s;
        }

        .cta-link:hover {
          background: var(--cyan);
          color: var(--navy-950);
          box-shadow: 0 0 30px rgba(103, 232, 249, 0.45);
        }

        .icon-link {
          display: inline-flex;
          height: 40px;
          width: 40px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(148, 190, 255, 0.25);
          background: transparent;
          color: #fff;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.2,0.8,0.2,1);
        }
        .icon-link:hover {
          border-color: #0A66C2;
          background: #0A66C2;
          color: #ffffff;
          transform: scale(1.08);
          box-shadow: 0 0 14px rgba(10, 102, 194, 0.45);
        }

        .icon-link:hover span {
          color: #0A66C2;
        }

        .icon-link:focus-visible {
         outline: 2px solid #0A66C2;
         outline-offset: 4px;
        }

        .icon-link:hover {
          background: var(--cyan);
          border-color: var(--cyan);
          color: var(--navy-950);
        }

        .cta-link:focus-visible,
        .icon-link:focus-visible,
        .drum-stage:focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 3px;
        }

        /* ---------- THE DRUM (every team) ---------- */
        .drum-section {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100svh;
          min-height: 600px;
          overflow: hidden;
          padding: var(--nav-offset) 0 clamp(14px, 2.6vh, 30px);
          background:
            radial-gradient(ellipse at 50% 55%, rgba(8, 100, 160, 0.2), transparent 55%),
            radial-gradient(ellipse at 20% 85%, rgba(14, 116, 144, 0.09), transparent 45%),
            #050812;
        }

        .drum-section .section-heading {
          margin-top:  clamp(24px, 4vh, 40px);
          margin-bottom: 0;
        }

        .drum-section .section-title {
          font-size: clamp(1.5rem, 3.4vw, 2.6rem);
        }

        .drum-section .section-heading p:not(.section-subtitle) {
          margin-top: 0.35rem;
        }

        .drum-stage {
          position: relative;
          z-index: 5;
          display: flex;
          flex: 1 1 0;
          min-height: 0;
          align-items: center;
          justify-content: center;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
          outline: none;
        }

        .drum-stage:active {
          cursor: grabbing;
        }

        .drum-stage:focus-visible .drum-card.is-active .drum-face {
          outline: 2px solid var(--cyan);
          outline-offset: 6px;
        }

        .drum {
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .drum-card {
          position: absolute;
          inset: 0;
          cursor: pointer;
          transform-style: preserve-3d;
        }

        .drum-face,
        .drum-back {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 20px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .drum-face {
          border: 1px solid rgba(148, 190, 255, 0.18);
          background: var(--navy-800);
          box-shadow: 0 20px 60px rgba(2, 6, 23, 0.6);
          transition: border-color 0.4s, box-shadow 0.4s;
        }

        .drum-photo {
          pointer-events: none;
          filter: grayscale(calc(1 - var(--focus, 1))) brightness(calc(0.4 + 0.6 * var(--focus, 1)));
        }

        .drum-face-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5, 11, 34, 0.92), rgba(5, 11, 34, 0.1) 42%, transparent 65%);
        }

        .drum-caption {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 12px;
          margin: 0;
          font-family: var(--font-member);
          font-size: clamp(15px, 1.5vw, 19px);
          font-weight: 700;
          line-height: 1.1;
          color: #fff;
          text-shadow: 0 2px 12px rgba(2, 6, 23, 0.9);
          opacity: calc(var(--focus, 1) * 0.9);
        }

        .drum-card.is-active .drum-caption {
          opacity: 0;
          transition: opacity 0.3s;
        }

        .drum-card.is-active .drum-face {
          border-color: rgba(103, 232, 249, 0.85);
          box-shadow:
            0 0 0 1px rgba(103, 232, 249, 0.4),
            0 0 60px rgba(34, 211, 238, 0.4),
            0 30px 80px rgba(2, 6, 23, 0.7);
        }

        .drum-back {
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotateY(180deg);
          border: 1px solid rgba(148, 190, 255, 0.12);
          background: linear-gradient(160deg, rgba(14, 40, 80, 0.5), rgba(5, 8, 18, 0.6));
        }

        .drum-floor {
          position: absolute;
          left: 50%;
          top: 50%;
          pointer-events: none;
          border-radius: 50%;
          border: 1px dashed rgba(103, 232, 249, 0.4);
          background: radial-gradient(circle, rgba(34, 211, 238, 0.18), rgba(30, 64, 175, 0.1) 45%, transparent 70%);
        }

        .drum-floor::after {
          content: "";
          position: absolute;
          inset: 14%;
          border-radius: 50%;
          border: 1px solid rgba(148, 190, 255, 0.14);
        }

        .drum-info {
          flex: none;
          padding-top: clamp(6px, 1.6vh, 16px);
        }

        .drum-info-row {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: clamp(10px, 3vw, 32px);
        }

        .drum-info-inner {
          text-align: center;
          animation: infoIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        @keyframes infoIn {
          from {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(5px);
          }
          to {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }

        .drum-role {
          display: inline-flex;
          max-width: 100%;
          align-items: center;
          gap: 10px;
          border-radius: 999px;
          border: 1px solid rgba(103, 232, 249, 0.35);
          background: rgba(34, 211, 238, 0.08);
          padding: 5px 16px;
          font-family: var(--font-member);
          font-size: clamp(0.8rem, 1.3vw, 0.95rem);
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #cffafe;
        }

        .drum-name {
          margin-top: 0.4rem;
          font-family: var(--font-member);
          font-size: clamp(1.9rem, 4.2vw, 3.3rem);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.01em;
          color: transparent;
          background: linear-gradient(180deg, #ffffff 35%, #a5f3fc);
          -webkit-background-clip: text;
          background-clip: text;
          filter: drop-shadow(0 0 22px rgba(34, 211, 238, 0.35));
        }

        .drum-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 0.35rem;
        }

        .drum-branch {
          font-family: var(--font-member);
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #cbd5e1;
        }

        .drum-meta .icon-link {
          height: 34px;
          width: 34px;
          border-color: rgba(103, 232, 249, 0.45);
          color: var(--cyan);
        }

        .drum-arrow {
          display: inline-flex;
          height: 48px;
          width: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(103, 232, 249, 0.4);
          background: rgba(5, 11, 34, 0.6);
          color: var(--cyan);
          cursor: pointer;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s;
        }

        .drum-arrow:hover {
          background: var(--cyan);
          color: var(--navy-950);
          box-shadow: 0 0 26px rgba(103, 232, 249, 0.5);
        }

        @media (max-width: 639px) {
          .drum-arrow {
            height: 40px;
            width: 40px;
          }
        }

        .drum-hint {
          margin-top: 0.3rem;
          text-align: center;
          font-family: var(--font-rajdhani), sans-serif;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #64748b;
        }

        .hint-touch {
          display: none;
        }

        @media (hover: none) {
          .hint-fine {
            display: none;
          }
          .hint-touch {
            display: inline;
          }
        }

        .drum-arrow:focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .starfield {
            animation: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

{/* HERO (unchanged) */}
      <section
        id="alumni-home"
        className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden">
          <NetworkBackground />

          {/* Optional soft background glow */}
          <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 48%, rgba(8,100,160,0.20), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(14,116,144,0.09), transparent 45%)",
          }}
          />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-32 text-center sm:px-8 md:pt-36">
            <h1 className="hero-reveal hero-delay-1 text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
              OUR
              <br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                ALUMNI
              </span>
            </h1>
            <p className="hero-reveal hero-delay-2 mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base md:text-lg">
              Celebrating the journeys, achievements and experiences of 
              our alumni. A growing network of innovators and professionals,
              connected by shared memories and a legacy of excellence.
            </p>
          </div>
      </section>
      

         {/* ALUMNI BATCH DRUMS */}
      <section id="alumni-batches" className="relative w-full py-16">
        <div className="mx-auto w-full">
          {alumniDrumData.map(({ batch, alumni }) => (
            <AlumniDrum
            key={batch}
            id={`alumni-${batch}`}
            title={`Batch ${batch}`}
            description={`Meet our alumni from the batch of ${batch}.`}
            alumni={alumni}
            />
          ))}
        </div>
      </section>

    </main>
  );
}