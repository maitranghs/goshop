import React from 'react'

const Home = () => (
  <main>
    <div className="container">
      <div className="row">
        <div className="col s3">
          <div>
            <h5 className="left-align blue-grey-text text-darken-3">Departments</h5>
            <div className="divider"></div>
            <div className="collection">
              <a href="#!" className="collection-item blue-grey-text text-darken-3">Regional<i className="material-icons right">arrow_drop_down</i></a>
              <a href="#!" className="collection-item blue-grey-text text-darken-3">Nature<i className="material-icons right">arrow_drop_down</i></a>
              <a href="#!" className="collection-item blue-grey-text text-darken-3">Seasonal<i className="material-icons right">arrow_drop_down</i></a>
            </div>
          </div>

          <div>
            <h5 className="left-align blue-grey-text text-darken-3">Filter</h5>
            <div className="divider"></div>
            <div className="section">
              <h6>Color</h6>
              <ul className="row">
                {['blue', 'purple', 'orange', 'green', 'red', 'black', 'yellow', 'gray', 'white', 'brown'].map((e,i) => 
                  <li key={i} className="col s2">
                    <a href="#!" className="btn" style={{'backgroundColor': e, 'marginBottom': '10px', height: '34px', width: '34px', 'borderRadius': '50%'}}>&nbsp;</a>
                  </li>
                )}
              </ul>
            </div>

            <div className="section">
              <h6>Size</h6>
              <ul className="row">
                {['XS', 'S', 'M', 'L', 'XL', 28, 29, 30, 31, 32].map((e,i) => 
                  <li className="col s2" key={i}>
                    <a href="#!" className="btn grey-text text-lighten-1 white" style={{'marginBottom': '10px', height: '40px', width: '40px', 'border': '1px #bdbdbd solid', 'boxShadow': 'none', padding: 0}}>{e}</a>
                  </li>
                )}
              </ul>
            </div>

            <div className="section">
              <h6>Price</h6>
              <p>
                <label>
                  <input type="radio" name="groupPrice" className="filled-in"/>
                  <span>&#60;$50</span>
                </label>
              </p>
              <p>
                <label>
                  <input type="radio" name="groupPrice" className="filled-in"/>
                  <span>$50-100</span>
                </label>
              </p>
              <p>
                <label>
                  <input type="radio" name="groupPrice" className="filled-in"/>
                  <span>$100-150</span>
                </label>
              </p>
              <p>
                <label>
                  <input type="radio" name="groupPrice" className="filled-in"/>
                  <span>&#62;$150</span>
                </label>
              </p>
            </div>

            <div className="right-align">
              <a href="#!" className="waves-effect waves-light btn">Clear</a>
            </div>
          </div>
        </div>
        <div className="col s9">
        
          <nav>
            <div className="nav-wrapper">
              <div className="col s12 teal lighten-2">
                <a className="breadcrumb" href="#!">All</a>
                <a className="breadcrumb" href="#!">Reagional</a>
                <a className="breadcrumb" href="#!">Italian</a>
              </div>
            </div>
          </nav>
          
          <div className="divider"></div>
          <div className="row">
            {[...Array(17)].map((e,i) => 
              <div className="col s4 m4" key={i}>
                <a href="#!">
                  <div className="card hoverable small center-align">
                    <div className="card-image">
                      <img src="https://demo.storefrontcloud.io/img/600/744/resize/w/s/ws11-green_main.jpg" alt="product"/>
                    </div>
                    <div className="card-content">
                      <span className="blue-grey-text text-darken-3">Minerva LumaTech™ V-Neck Tee</span>
                      <p className="blue-grey-text text-darken-3">$15.67</p>
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </main>
)

export default Home