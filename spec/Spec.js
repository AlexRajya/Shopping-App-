let response = {"from":1,"to":10,"currentPage":1,"total":1969,"totalPages":197,"queryTime":"0.025","totalTime":"0.050","partial":false,"canonicalUrl":"/v1/products(search=\"oven\")?show=image,name,salePrice&format=json&apiKey=lfXY4GpC14duGk4N3uGvGD3d","products":[{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5771/5771224_sa.jpg","name":"30\" Storage Drawer for Most Bosch Speed, Steam and Wall Ovens - Stainless steel","salePrice":584.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/8939/8939526_ra.jpg","name":"GE - Profile Advantium Wall Oven Storage Drawer - Stainless steel","salePrice":404.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6292/6292471_sa.jpg","name":"Thermador - 30\" Short Storage Drawer","salePrice":649.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5869/5869443_sa.jpg","name":"Dacor - Oven Rack for Ovens - Chrome","salePrice":199.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/8946/8946582le.jpg","name":"Dacor - Baking Sheet for Ranges and Wall Ovens - Silver","salePrice":169.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5887/5887104_sa.jpg","name":"DCS by Fisher & Paykel - Square Door Handle for Ovens - Silver","salePrice":209.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6342/6342823_sa.jpg","name":"Fulgor Milano - Distinto Telescopic Rack for Ovens - Silver","salePrice":179.00},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6298/6298926_sa.jpg","name":"Café - Handle for Wall Ovens - Brushed Black","salePrice":134.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6298/6298929_sa.jpg","name":"Café - Handle for Wall Ovens - Brushed Bronze","salePrice":134.99},{"image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6298/6298937_sa.jpg","name":"Café - Handle for Wall Ovens - Stainless steel","salePrice":134.99}]};

describe("Test BestBuy API", () =>{
  it("should be a JSON", () =>{
    var objectConstructor = ({}).constructor;
    let result = false;
    if (response.constructor === objectConstructor){
      result = true;
    }
    expect(result).toBe(true);
  })
})
