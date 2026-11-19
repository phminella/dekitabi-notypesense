const languages = [
  "ja",
  "zh_cn",
  "zh_tw",
  "ko",
  "tl",
  "id",
  "th",
  "vi",
  "ms",
  "fr",
  "es",
  "it",
  "pt",
];
const sections = ["itineraries", "attractions", "guides", "build"];
// ${itineraries
//   .map(({ id }) => {
//     return `
//   <url>
//       <loc>${`${ITINERARIES_URL}/${id}`}</loc>
//   </url>
// `;
//   })
//   .join("")}
//    ${cities
//      .map((city) => {
//        return `
//   <url>
//       <loc>${`${SEARCH_URL}/${city}`}</loc>
//   </url>
// `;
//      })
//      .join("")}
function generateSiteMap(itineraries, guides, cities) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
  http://www.w3.org/1999/xhtml
  http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">
      <url>
      <loc>https://www.dekitabi.com/</loc>
      ${languages
        ?.map((lang) => {
          return `<xhtml:link
          rel="alternate"
          hreflang="${
            lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
          }"
          href="https://www.dekitabi.com/${lang}" />`;
        })
        .join("")} 
      <changefreq>monthly</changefreq>
      <priority>1</priority>
  </url>
  <url>
      <loc>https://www.dekitabi.com/affiliate-program</loc>
      ${languages
        ?.map((lang) => {
          return `
<xhtml:link rel="alternate" hreflang="${
            lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
          }" href="https://www.dekitabi.com/${lang}/affiliate-program" />           
`;
        })
        .join("")} 
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
  </url>    
      <url>
      <loc>https://www.dekitabi.com/about</loc>
      ${languages
        ?.map((lang) => {
          return `
<xhtml:link rel="alternate" hreflang="${
            lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
          }" href="https://www.dekitabi.com/${lang}/about" />           
`;
        })
        .join("")} 
      <changefreq>yearly</changefreq>
      <priority>0.6</priority>
  </url>    
      
        <url>
            <loc>https://www.dekitabi.com/guide-at-dekitabi</loc>
            ${languages
              ?.map((lang) => {
                return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/guide-at-dekitabi" />           
      `;
              })
              .join("")} 
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
        </url>
        <url>
            <loc>https://www.dekitabi.com/cancelation-policy</loc>
            ${languages
              ?.map((lang) => {
                return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/cancelation-policy" />           
      `;
              })
              .join("")} 
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>https://www.dekitabi.com/careers</loc>
            ${languages
              ?.map((lang) => {
                return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/careers" />           
      `;
              })
              .join("")} 
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>https://www.dekitabi.com/contact-us</loc>
            ${languages
              ?.map((lang) => {
                return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/contact-us" />           
      `;
              })
              .join("")} 
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>https://www.dekitabi.com/guides-general-information</loc>
            ${languages
              ?.map((lang) => {
                return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/guides-general-information" />           
      `;
              })
              .join("")} 
            <changefreq>monthly</changefreq>
            <priority>0.6</priority>
        </url>
        <url>
            <loc>https://www.dekitabi.com/payments-and-payouts-policy</loc>
            ${languages
              ?.map((lang) => {
                return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/payments-and-payouts-policy" />           
      `;
              })
              .join("")} 
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>https://www.dekitabi.com/privacy-policy</loc>
            ${languages
              ?.map((lang) => {
                return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/privacy-policy" />           
      `;
              })
              .join("")} 
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
        </url>
        <url>
            <loc>https://www.dekitabi.com/terms-and-conditions</loc>
            ${languages
              ?.map((lang) => {
                return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/terms-and-conditions" />           
      `;
              })
              .join("")} 
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>https://www.dekitabi.com/suggest-attractions</loc>
            ${languages
              ?.map((lang) => {
                return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/suggest-attractions" />           
      `;
              })
              .join("")} 
            <changefreq>monthly</changefreq>
            <priority>0.6</priority>
        </url>
     ${guides
       .map(({ username }) => {
         return `
         <url>
             <loc>${`https://www.dekitabi.com/${username}`}</loc>
             ${languages
               ?.map((lang) => {
                 return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/${username}" />           
      `;
               })
               .join("")} 
             <changefreq>monthly</changefreq>
             <priority>0.9</priority>
         </url>
       `;
       })
       .join("")}
       ${itineraries
         .map(({ url, id }) => {
           return `
         <url>
             <loc>${`https://www.dekitabi.com/itinerary/${
               url ? url : id
             }`}</loc>
             ${languages
               ?.map((lang) => {
                 return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/${lang}/itinerary/${
                   url ? url : id
                 }" />           
      `;
               })
               .join("")} 
             <changefreq>monthly</changefreq>
             <priority>0.9</priority>
         </url>
       `;
         })
         .join("")}   
         
         ${cities
           .map(({ translatedCity }) => {
             return `
         <url>
             <loc>${`https://www.dekitabi.com/s/${translatedCity["en"]
               .split(" ")
               .join("-")}`}</loc>
             ${languages
               ?.map((lang) => {
                 return `
     <xhtml:link rel="alternate" hreflang="${
       lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
     }" href="https://www.dekitabi.com/s/${translatedCity["en"]
                   .split(" ")
                   .join("-")}" />           
      `;
               })
               .join("")} 
             <changefreq>monthly</changefreq>
             <priority>0.9</priority>
         </url>
       `;
           })
           .join("")}
         </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const { firestoreAdmin } = await import("../lib/firebase/firebaseAdmin");
  const getDataFromFirestore = async (querySnapshot, guides) => {
    let tempData = [];
    querySnapshot.forEach(async (doc) => {
      if (guides) {
        if (
          (doc.data().avatar !== "/img/avatar.png" ||
            doc.data().photos?.length > 0) &&
          doc.data().verified === "true"
        ) {
          tempData.push(doc.data());
        }
      } else {
        tempData.push(doc.data());
      }
    });
    return tempData;
  };
  // const getAttractionsFromFirestore = async (querySnapshot) => {
  //   let tempData = [];
  //   querySnapshot.forEach(async (doc) => {
  //     tempData.push(doc.data());
  //   });
  //   return tempData;
  // };
  // Get itineraries from firestore
  const itinerariesRef = firestoreAdmin
    .collection("itineraries")
    .where("published", "==", true)
    .orderBy("url");
  const itinerariesQ = await itinerariesRef.get();
  const itineraries = await getDataFromFirestore(itinerariesQ)
    .then(async (itinerariesFromDb) => {
      return itinerariesFromDb;
    })
    .catch((err) => console.log(err));
  // Get attractions from firestore
  // const attractionsRef = firestoreAdmin.collection("attractions");
  // const attractionsQ = await attractionsRef.get();
  // const attractions = await getAttractionsFromFirestore(attractionsQ)
  //   .then(async (attractionsFromDb) => {
  //     return attractionsFromDb;
  //   })
  //   .catch((err) => console.log(err));
  // Get guides from firestore
  const guidesRef = firestoreAdmin.collection("users");
  const guidesQ = await guidesRef.where("guide", "==", "true").get();
  const guides = await getDataFromFirestore(guidesQ, true)
    .then(async (guidesFromDb) => {
      return guidesFromDb;
    })
    .catch((err) => console.log(err));
  // Get cities from firestore
  const citiesRef = firestoreAdmin.collection("cities");
  const citiesQ = await citiesRef.get();
  const cities = await getDataFromFirestore(citiesQ)
    .then(async (citiesFromDb) => {
      return citiesFromDb;
    })
    .catch((err) => console.log(err));
  // We generate the XML sitemap with the posts data
  // console.log("CITIES", cities);
  const sitemap = generateSiteMap(itineraries, guides, cities);
  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}

export default SiteMap;
