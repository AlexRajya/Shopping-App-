let bbresponse = {"from":1,"to":10,"currentPage":1,"total":1969,"totalPages":197,"queryTime":"0.025","totalTime":"0.050","partial":false,"canonicalUrl":"/v1/products(search=\"oven\")?show=image,name,salePrice&format=json&apiKey=lfXY4GpC14duGk4N3uGvGD3d","products":[{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5771/5771224_sa.jpg","name":"30\" Storage Drawer for Most Bosch Speed, Steam and Wall Ovens - Stainless steel","salePrice":584.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/8939/8939526_ra.jpg","name":"GE - Profile Advantium Wall Oven Storage Drawer - Stainless steel","salePrice":404.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6292/6292471_sa.jpg","name":"Thermador - 30\" Short Storage Drawer","salePrice":649.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5869/5869443_sa.jpg","name":"Dacor - Oven Rack for Ovens - Chrome","salePrice":199.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/8946/8946582le.jpg","name":"Dacor - Baking Sheet for Ranges and Wall Ovens - Silver","salePrice":169.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5887/5887104_sa.jpg","name":"DCS by Fisher & Paykel - Square Door Handle for Ovens - Silver","salePrice":209.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6342/6342823_sa.jpg","name":"Fulgor Milano - Distinto Telescopic Rack for Ovens - Silver","salePrice":179.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6298/6298926_sa.jpg","name":"Café - Handle for Wall Ovens - Brushed Black","salePrice":134.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6298/6298929_sa.jpg","name":"Café - Handle for Wall Ovens - Brushed Bronze","salePrice":134.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6298/6298937_sa.jpg","name":"Café - Handle for Wall Ovens - Stainless steel","salePrice":134.99}]};

let tresponse = {};

let aresponse = {};

describe("Test APIs", () =>{
  beforeEach( function() {let result = false;});

  var objectConstructor

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

describe("Add to basket", () =>{
  it("should add item to basket", () =>{
    let itemInfo = {
      info: "bread",
      img: "bread.jpg"
    }
    //add product to basket
    //expect(basket.basket.length).tobe(1);
  });
});

describe("Empty basket", () =>{
  it("should clear the basket", () =>{
    var ebasket = new emptyBasket();
    expect(ebasket.document.getElementById("basketTable")).tobe(null);
  });
});

describe("Load basket", () =>{
  it("should load the contents of the basket", () =>{
    loadBasket();
    expect(loadBasket().basket[0]).not.toEqual(null);
  });
});

/*
describe("Test admin login", () =>{

  it("should test the function test", async (done) => {
      var index = new login();
      abc.test();
      expect( await abc.someVariable).toBe('new value');  // await will wait until abc.someVariable resolved or rejected
  });
});
*/


describe("Test admin login", () =>{
  beforeEach(async function() {
    v
    const response = await fetch('users.txt');
    const text = await response.text();
    const users = JSON.parse(text);
});

  it("should test the function test", async (done) => {
    var loginText = "admin";
    var passwordText = "1234";
    expect(users.username[0]).toBe(loginText);
    expect(users.password[0]).toBe(passwordText);
});

});
