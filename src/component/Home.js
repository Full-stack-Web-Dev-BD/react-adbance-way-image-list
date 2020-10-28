import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Navbar from './Navbar'
import EuroIcon from '@material-ui/icons/Euro';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'inline-block',
    border: '1px solid #d0d5db',
    alignItems: 'center',
    width: "100%"
  },
  selectOption: {
    // border: '1px solid #777777',
    width: '330px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


const Home = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([])
  const [selected, setSelected] = useState()
  const [searchResult, setSearchResult] = useState([])
  const [searching, setSearching] = useState(false)
  let PRODUCT = [
    {
      id: 1,
      brand: 'Salomon',
      title: 'Speedcross Vario 2 Mens Running Shoes',
      hasDiscount: false,
      price: {
        currency: 'EUR',
        regularPrice: 125.99,
        finalPrice: 125.99
      },
      image: '1.webp'
    },
    {
      id: 2,
      brand: 'Salomon',
      title: 'Speedcross 4 Running Shoes Mens',
      hasDiscount: true,
      price: {
        currency: 'EUR',
        regularPrice: 131.99,
        finalPrice: 105.60
      },
      image: '2.webp'
    },
    {
      id: 3,
      brand: 'Nike',
      title: 'Mens Air Max IVO Trainers',
      hasDiscount: true,
      price: {
        currency: 'EUR',
        regularPrice: 159.99,
        finalPrice: 99.99
      },
      image: '3.webp'
    },
    {
      id: 4,
      brand: 'Nike',
      title: 'Air Max Graviton Men\'s Shoe',
      hasDiscount: false,
      price: {
        currency: 'EUR',
        regularPrice: 107.99,
        finalPrice: 107.99
      },
      image: '4.webp'
    },
    {
      id: 5,
      brand: 'Puma',
      title: 'Roma Basic Mens Trainers',
      hasDiscount: false,
      price: {
        currency: 'EUR',
        regularPrice: 77.99,
        finalPrice: 77.99
      },
      image: '5.webp'
    },
    {
      id: 6,
      brand: 'Puma',
      title: 'Zeta Suede Trainers',
      hasDiscount: true,
      price: {
        currency: 'EUR',
        regularPrice: 83.99,
        finalPrice: 42.00
      },
      image: '6.webp'
    },
    {
      id: 7,
      brand: 'Adidas',
      title: 'Supernova Boost Running Shoes Mens',
      hasDiscount: true,
      price: {
        currency: 'EUR',
        regularPrice: 101.99,
        finalPrice: 74.40
      },
      image: '7.webp'
    },
    {
      id: 8,
      brand: 'Adidas',
      title: 'Game Court Trainers Mens',
      hasDiscount: false,
      price: {
        currency: 'EUR',
        regularPrice: 59.99,
        finalPrice: 59.99
      },
      image: '8.webp'
    },
    {
      id: 9,
      brand: 'Adidas',
      title: 'Pace VS Mens Trainers',
      hasDiscount: true,
      price: {
        currency: 'EUR',
        regularPrice: 51.59,
        finalPrice: 43.20
      },
      image: '9.webp'
    }
  ];


  useEffect(() => {
    setProduct(PRODUCT)
  }, [])
  const sort = (e) => {
    if (e.target.value === "brand") {
      function compare(a, b) {
        if (a.brand < b.brand) {
          return -1;
        }

        if (a.brand > b.brand) {
          return 1;
        }
        return 0;
      }

      let brandsort = PRODUCT.sort(compare);
      setProduct(brandsort)
    }
    if (e.target.value === "title") {

      function compare(a, b) {
        if (a.title < b.title) {
          return -1;
        }

        if (a.title > b.title) {
          return 1;
        }
        return 0;
      }

      let titlesort = PRODUCT.sort(compare);
      setProduct(titlesort)
    }
    if (e.target.value === "price") {
      let priceSort = PRODUCT.sort((a, b) => parseFloat(a.price.finalPrice) - parseFloat(b.price.finalPrice));
      console.log(priceSort);
      setProduct(priceSort)
    }
  }


  const searchProduct = (e) => {
    if(e.target.value===''){
      setSearchResult([])
    }
    setSearching(true)
    let text = e.target.value
    PRODUCT.map(singleProduct => {
      let x = singleProduct.title.toLowerCase()
      let splitedTitle = x.split(' ')
      let result = splitedTitle.indexOf(text.toLowerCase()); // returns 3
      if (result !== -1) {
        console.log(singleProduct);
        return setSearchResult([...searchResult, singleProduct])
      }
    })
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <h4 className="page-title" >Category</h4>
        <div className="row mt-10">
          <div className="col-md-7 col-sm-12 text-left mt-10">
            <div style={{ maxWidth: '400px' }}>
              <Paper component="form" className={classes.root}>
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  id="inputSearch"
                  className={classes.input}
                  placeholder="Search "
                  onChange={e => searchProduct(e)}
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
              </Paper>
            </div>
          </div>
          <div className="col-md-5 col-sm-12 text-right mt-10">
            <div className="sorter">
              <select onChange={e => sort(e)} className="form-control " style={{ height: '50px' }}>
                <option> Sort By</option>
                <option value="brand" > Brand </option>
                <option value="title" > Title</option>
                <option value="price" > Price </option>
              </select>
            </div>
          </div>
        </div>
        {
          searching ?
            <div className="searchResult">
              <div className="products row mt-30">
                <div className="col-12">
                  <p className="text-center text-success" >Search Result</p>
                </div>
                {
                  searchResult.length < 1 ?
                    <h5 className=" p-5 text-center " style={{ color: '#FF0000' }}>Not Found</h5> : ''
                }
                {
                  searchResult.map(el => {
                    return (
                      <div className=" col-xl-4 col-md-4 col-sm-12" onClick={e => { setSelected(el) }}>
                        <div className="singleProduct d-flex">
                          <div className="productImg">
                            <img src={`./images/${el.image}`} alt="" />
                          </div>
                          <div className="productDetails">
                            <p className="brand"> {el.brand} </p>
                            <h5> {el.title} </h5>
                            <div className="priceBtnGroup">
                              {
                                el.price.regularPrice ?
                                  <span className="priceBtn regularBtn"> <s> {el.price.regularPrice} €</s></span> : ''
                              }
                              <button className="btn priceBtn finalBtn ml-20 "> <span>{el.price.finalPrice} €</span> </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <hr></hr>
            </div> : ''
        }

        <div className="products row mt-30">
          {
            product.map(el => {
              return (
                <div className=" col-xl-4 col-md-4 col-sm-12" onClick={e => { setSelected(el) }}>
                  <div className="singleProduct d-flex">
                    <div className="productImg">
                      <img src={`./images/${el.image}`} alt="" />
                    </div>
                    <div className="productDetails">
                      <p className="brand"> {el.brand} </p>
                      <h5> {el.title} </h5>
                      <div className="priceBtnGroup">
                        {
                          el.price.regularPrice ?
                            <span className="priceBtn regularBtn"> <s> {el.price.regularPrice} €</s></span> : ''
                        }
                        <button className="btn priceBtn finalBtn ml-20 "> <span>{el.price.finalPrice} €</span> </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          selected ?
            <div className=" selected">
              <div className=" offset-md-3 col-md-6 col-sm-12">
                <div className="singleProduct d-flex">
                  <div className="productImg">
                    <img src={`./images/${selected.image}`} alt="" />
                  </div>
                  <div className="productDetails">
                    <p className="brand"> {selected.brand} </p>
                    <h5> {selected.title} </h5>
                    <div className="priceBtnGroup">
                      <span className="priceBtn regularBtn"> <s> {selected.price.regularPrice} €</s></span>
                      <button className="btn priceBtn finalBtn ml-20 "> <span>{selected.price.finalPrice} €</span> </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> :
            <div className=" selected">
              <div className=" offset-md-3 col-md-6 col-sm-12">
                <h3 style={{ margin: '70px 0' }} className="text-center">No Product Selected</h3>
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default Home
