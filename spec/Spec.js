//NOTE: Not all tests will pass until the main application is run at least once 
const fs = require('fs')

////////////////////CHECK FILES//////////////////////////////////////
//Load the basket file
describe("Load basket file", ()=>{
  beforeEach( function() {let result = false;});
  it("Should load text file of users", () => {
    try{
      let basketTest = fs.readFileSync('basketData.txt', 'utf8');
      result = true;
    }catch(err){
      result = false;
    }
    expect(result).toBe(true);
  });
});

//Check basket file content
describe("check basket file content", ()=>{
  beforeEach( function() {let result = false;});
  it("Content should be JSON", () => {
    let basket;
    try{
      basket = fs.readFileSync('basketData.txt', 'utf8');
    }catch(err){
      console.log("Basket file does not exist");
    }
    objectConstructor = ({}).constructor;
    if (basket.constructor === objectConstructor){
      result = true;
    }
    expect(result).toBe(true);
  });
});

//Load the text file of users
describe("Load users file", ()=>{
  beforeEach( function() {let result = false;});
  it("Should load text file of users", () => {
    try{
      let userTest = fs.readFileSync('users.txt', 'utf8');
      result = true;
    }catch(err){
      result = false;
    }
    expect(result).toBe(true);
  });
});

//Check users file content
describe("check user file content", ()=>{
  beforeEach( function() {let result = false;});
  it("Content should be JSON", () => {
    let user;
    try{
      user = fs.readFileSync('users.txt', 'utf8');
    }catch(err){
      console.log("Users file does not exist");
    }
    objectConstructor = ({}).constructor;
    if (user.constructor === objectConstructor){
      result = true;
    }
    expect(result).toBe(true);
  });
});
////////////////////END OF CHECK FILES//////////////////////////////////////


////////////////////CHECK API RESPONSES//////////////////////////////////////
let bbresponse = {"from":1,"to":10,"currentPage":1,"total":1969,"totalPages":197,"queryTime":"0.025","totalTime":"0.050","partial":false,"canonicalUrl":"/v1/products(search=\"oven\")?show=image,name,salePrice&format=json&apiKey=lfXY4GpC14duGk4N3uGvGD3d","products":[{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5771/5771224_sa.jpg","name":"30\" Storage Drawer for Most Bosch Speed, Steam and Wall Ovens - Stainless steel","salePrice":584.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/8939/8939526_ra.jpg","name":"GE - Profile Advantium Wall Oven Storage Drawer - Stainless steel","salePrice":404.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6292/6292471_sa.jpg","name":"Thermador - 30\" Short Storage Drawer","salePrice":649.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5869/5869443_sa.jpg","name":"Dacor - Oven Rack for Ovens - Chrome","salePrice":199.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/8946/8946582le.jpg","name":"Dacor - Baking Sheet for Ranges and Wall Ovens - Silver","salePrice":169.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5887/5887104_sa.jpg","name":"DCS by Fisher & Paykel - Square Door Handle for Ovens - Silver","salePrice":209.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6342/6342823_sa.jpg","name":"Fulgor Milano - Distinto Telescopic Rack for Ovens - Silver","salePrice":179.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6298/6298926_sa.jpg","name":"Café - Handle for Wall Ovens - Brushed Black","salePrice":134.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6298/6298929_sa.jpg","name":"Café - Handle for Wall Ovens - Brushed Bronze","salePrice":134.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6298/6298937_sa.jpg","name":"Café - Handle for Wall Ovens - Stainless steel","salePrice":134.99}]};

let tresponse = {
  "uk": {
    "ghs": {
      "products": {
        "input_query": "Bread",
        "output_query": "Bread",
        "filters": {},
        "queryPhase": "primary",
        "totals": {
          "all": 244,
          "new": 1,
          "offer": 16
        },
        "config": "default",
        "results": [{
          "image": "http://img.tesco.com/Groceries/pi/131/5010003000131/IDShot_90x90.jpg",
          "superDepartment": "Bakery",
          "tpnb": 53542320,
          "ContentsMeasureType": "G",
          "name": "Hovis Soft White Medium Bread 800G",
          "UnitOfSale": 1,
          "AverageSellingUnitWeight": 0.445,
          "description": ["Medium Sliced White Bread"],
          "UnitQuantity": "100G",
          "id": 256174499,
          "ContentsQuantity": 800,
          "department": "Bread & Rolls",
          "price": 1.0,
          "unitprice": 0.125
        }, {
          "image": "http://img.tesco.com/Groceries/pi/008/5057545579008/IDShot_90x90.jpg",
          "superDepartment": "Bakery",
          "tpnb": 84511391,
          "ContentsMeasureType": "G",
          "name": "Tesco White Bread 800G",
          "UnitOfSale": 1,
          "AverageSellingUnitWeight": 0.805,
          "description": ["Medium sliced white bread.", "Medium sliced Baked for a soft and light texture"],
          "UnitQuantity": "100G",
          "id": 299389116,
          "ContentsQuantity": 800,
          "department": "Bread & Rolls",
          "price": 0.59,
          "unitprice": 0.074
        }],
        "suggestions": []
      }
    }
  }
};

let aresponse = {"status":"OK","payload":{"keyword":"\"bread\"","storeId":"4565","shipOnDate":"2020-03-27","totalResult":187,"maxResults":20,"autoSuggestionTerms":[],"autoSuggestionItems":[{"skuId":"34536","skuName":"Medium White Bread","availability":"A","price":"£1.05","weight":"800G","pricePerUOM":"13.13p/100g","promoType":"No Promo","productURL":"https://groceries.asda.com:443/api/items/view?itemid=34536","promoId":"","promoOfferTypeCode":"","promoDetail":"","promoQty":"","promoValue":"","extraLargeImageURL":"/g/v5/000/039/5010044000039_197_IDShot_2.jpeg","imageURL":"/g/v5/000/039/5010044000039_93_IDShot_1.jpeg","wasPrice":"","isBundle":false,"avgWeight":"","salesUnit":"Each","deptId":"910000975215","deptName":"Bakery","maxQty":"3.0","brand":"Warburtons","superDeptId":"1215135760597","superDeptName":"Fresh Food & Bakery","futureItemText":"","onSale":false,"salePrice":""},{"skuId":"42747407","skuName":"Medium 50/50 Bread","availability":"A","price":"£0.95","weight":"800G","pricePerUOM":"11.87p/100g","promoType":"Asda Price","productURL":"https://groceries.asda.com:443/api/items/view?itemid=42747407","promoId":"","promoOfferTypeCode":"","promoDetail":"","promoQty":"","promoValue":"","extraLargeImageURL":"/g/v5/093/441/5010092093441_197_IDShot_2.jpeg","imageURL":"/g/v5/093/441/5010092093441_93_IDShot_1.jpeg","wasPrice":"","isBundle":false,"avgWeight":"","salesUnit":"Each","deptId":"910000975215","deptName":"Bakery","maxQty":"3.0","brand":"Kingsmill","superDeptId":"1215135760597","superDeptName":"Fresh Food & Bakery","futureItemText":"","onSale":false,"salePrice":""},{"skuId":"42747415","skuName":"Medium Soft White Bread","availability":"A","price":"£0.95","weight":"800G","pricePerUOM":"11.87p/100g","promoType":"Asda Price","productURL":"https://groceries.asda.com:443/api/items/view?itemid=42747415","promoId":"","promoOfferTypeCode":"","promoDetail":"","promoQty":"","promoValue":"","extraLargeImageURL":"/g/v5/093/045/5010092093045_197_IDShot_2.jpeg","imageURL":"/g/v5/093/045/5010092093045_93_IDShot_1.jpeg","wasPrice":"","isBundle":false,"avgWeight":"","salesUnit":"Each","deptId":"910000975215","deptName":"Bakery","maxQty":"3.0","brand":"Kingsmill","superDeptId":"1215135760597","superDeptName":"Fresh Food & Bakery","futureItemText":"","onSale":false,"salePrice":""},{"skuId":"910002989320","skuName":"Square Cut Medium White Bread","availability":"A","price":"£0.55","weight":"800G","pricePerUOM":"6.88p/100g","promoType":"No Promo","productURL":"https://groceries.asda.com:443/api/items/view?itemid=910002989320","promoId":"","promoOfferTypeCode":"","promoDetail":"","promoQty":"","promoValue":"","extraLargeImageURL":"/g/v5/496/700/5054781496700_197_IDShot_2.jpeg","imageURL":"/g/v5/496/700/5054781496700_93_IDShot_1.jpeg","wasPrice":"","isBundle":false,"avgWeight":"","salesUnit":"Each","deptId":"910000975215","deptName":"Bakery","maxQty":"3.0","brand":"ASDA","superDeptId":"1215135760597","superDeptName":"Fresh Food & Bakery","futureItemText":"","onSale":false,"salePrice":""},{"skuId":"34537","skuName":"Toastie Thick Sliced White Bread","availability":"A","price":"£1.05","weight":"800G","pricePerUOM":"13.13p/100g","promoType":"No Promo","productURL":"https://groceries.asda.com:443/api/items/view?itemid=34537","promoId":"","promoOfferTypeCode":"","promoDetail":"","promoQty":"","promoValue":"","extraLargeImageURL":"/g/v5/000/121/5010044000121_197_IDShot_2.jpeg","imageURL":"/g/v5/000/121/5010044000121_93_IDShot_1.jpeg","wasPrice":"","isBundle":false,"avgWeight":"","salesUnit":"Each","deptId":"910000975215","deptName":"Bakery","maxQty":"3.0","brand":"Warburtons","superDeptId":"1215135760597","superDeptName":"Fresh Food & Bakery","futureItemText":"","onSale":false,"salePrice":""},{"skuId":"910003041519","skuName":"Farmhouse White Bread","availability":"A","price":"£0.84","weight":"800G","pricePerUOM":"10.5p/100g","promoType":"No Promo","productURL":"https://groceries.asda.com:443/api/items/view?itemid=910003041519","promoId":"","promoOfferTypeCode":"","promoDetail":"","promoQty":"","promoValue":"","extraLargeImageURL":"/g/v5/498/087/5054781498087_197_IDShot_2.jpeg","imageURL":"/g/v5/498/087/5054781498087_93_IDShot_1.jpeg","wasPrice":"","isBundle":false,"avgWeight":"","salesUnit":"Each","deptId":"910000975215","deptName":"Bakery","maxQty":"3.0","brand":"ASDA Extra Special","superDeptId":"1215135760597","superDeptName":"Fresh Food & Bakery","futureItemText":"","onSale":false,"salePrice":""},{"skuId":"910003041844","skuName":"Farmhouse Wholemeal & Rye Bread","availability":"A","price":"£0.84","weight":"800G","pricePerUOM":"10.5p/100g","promoType":"No Promo","productURL":"https://groceries.asda.com:443/api/items/view?itemid=910003041844","promoId":"","promoOfferTypeCode":"","promoDetail":"","promoQty":"","promoValue":"","extraLargeImageURL":"/g/v5/498/070/5054781498070_197_IDShot_2.jpeg","imageURL":"/g/v5/498/070/5054781498070_93_IDShot_1.jpeg","wasPrice":"","isBundle":false,"avgWeight":"","salesUnit":"Each","deptId":"910000975215","deptName":"Bakery","maxQty":"3.0","brand":"ASDA Extra Special","superDeptId":"1215135760597","superDeptName":"Fresh Food & Bakery","futureItemText":"","onSale":false,"salePrice":""},{"skuId":"910000063300","skuName":"Tiger Tin Bread ","availability":"A","price":"£1.10","weight":"800G","pricePerUOM":"13.75p/100g","promoType":"No Promo","productURL":"https://groceries.asda.com:443/api/items/view?itemid=910000063300","promoId":"","promoOfferTypeCode":"","promoDetail":"","promoQty":"","promoValue":"","extraLargeImageURL":"/g/v5/000/003/0250600000003_197_IDShot_2.jpeg","imageURL":"/g/v5/000/003/0250600000003_93_IDShot_1.jpeg","wasPrice":"","isBundle":false,"avgWeight":"","salesUnit":"Each","deptId":"910000975215","deptName":"Bakery","maxQty":"3.0","brand":"ASDA Baker's Selection","superDeptId":"1215135760597","superDeptName":"Fresh Food & Bakery","futureItemText":"","onSale":false,"salePrice":""},{"skuId":"394921","skuName":"White Tin Bread","availability":"A","price":"£1.10","weight":"800G","pricePerUOM":"13.75p/100g","promoType":"No Promo","productURL":"https://groceries.asda.com:443/api/items/view?itemid=394921","promoId":"","promoOfferTypeCode":"","promoDetail":"","promoQty":"","promoValue":"","extraLargeImageURL":"/g/v5/000/008/0230010000008_197_IDShot_2.jpeg","imageURL":"/g/v5/000/008/0230010000008_93_IDShot_1.jpeg","wasPrice":"","isBundle":false,"avgWeight":"","salesUnit":"Each","deptId":"910000975215","deptName":"Bakery","maxQty":"3.0","brand":"ASDA Baker's Selection","superDeptId":"1215135760597","superDeptName":"Fresh Food & Bakery","futureItemText":"","onSale":false,"salePrice":""},{"skuId":"910002989489","skuName":"Medium Wholemeal Bread","availability":"A","price":"£0.55","weight":"800G","pricePerUOM":"6.88p/100g","promoType":"No Promo","productURL":"https://groceries.asda.com:443/api/items/view?itemid=910002989489","promoId":"","promoOfferTypeCode":"","promoDetail":"","promoQty":"","promoValue":"","extraLargeImageURL":"/g/v5/496/717/5054781496717_197_IDShot_2.jpeg","imageURL":"/g/v5/496/717/5054781496717_93_IDShot_1.jpeg","wasPrice":"","isBundle":false,"avgWeight":"","salesUnit":"Each","deptId":"910000975215","deptName":"Bakery","maxQty":"3.0","brand":"ASDA","superDeptId":"1215135760597","superDeptName":"Fresh Food & Bakery","futureItemText":"","onSale":false,"salePrice":""}],"workspaceId":null},"processTime":37};
//End of example API responeses

//Verify the API responses
describe("Check API response's format is JSON", () =>{
  beforeEach( function() {let result = false;});
  let objectConstructor

  it("for BestBuy", () =>{
    objectConstructor = ({}).constructor;
    if (bbresponse.constructor === objectConstructor){
      result = true;
    }
    expect(result).toBe(true);
  });

  it("for tesco", () =>{
    objectConstructor = ({}).constructor;
    if (tresponse.constructor === objectConstructor){
      result = true;
    }
    expect(result).toBe(true);
  });

  it("for Asda", () =>{
    objectConstructor = ({}).constructor;
    if (aresponse.constructor === objectConstructor){
      result = true;
    }
    expect(result).toBe(true);
  });
});
////////////////////END OF API RESPONSES//////////////////////////////////////
