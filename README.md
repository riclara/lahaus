# TECHNICAL EVALUATION BACKEND

>  Short.it api for evaluation
## Build Setup
```sh
# Run develop environment
$ git clone https://github.com/riclara/lahaus.git # or clone your own fork
$ cd lahaus
$ npm install
$ npm run dev
```
Your app should now be running on [localhost:8000](http://localhost:8000/).

## Tests
```sh
# Run Tests
$ npm test
```

## Api Examples

### Create
```sh
  curl -X POST \
  https://lahaus.herokuapp.com \
  -H 'Content-Type: application/json' \
  -d '{
	"url": "https://www.amazon.com/Emotional-First-Aid-Rejection-Everyday-ebook/dp/B00AWLC21M?pd_rd_w=hvCty&pf_rd_p=5a9d3074-301b-4d67-a5bd-4bc27d04c15e&pf_rd_r=E0KXCV3QEJXFDYSKNS93&pd_rd_r=1562e962-4989-4e51-afac-d21b757ba598&pd_rd_wg=gzZiZ&ref_=pd_gw_nfp"
  }'
```

### Retrieve
```sh
  curl -X GET \
  https://lahaus.herokuapp.com/35863697b3 \
  -H 'Content-Type: application/json'
```
