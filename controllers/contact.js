const contactModel = require('../Models/Contact');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const query = asyncErrorHandler( async (req,res,next)=>{
    const customer_id = req.body.customer_id;
    const contact_no = req.body.contact_no;
    const contact_email = req.body.contact_email;
    const contact_query = req.body.contact_query;

    const createdQuery = await contactModel.create({
        customer_id: customer_id,
        contact_email: contact_email,
        contact_no: contact_no,
        contact_query: contact_query
    })

    res.status(200).json({
        status: 200,
        msg: "Your query has been submitted successfully",
        query: createdQuery
    })
})

module.exports = {query};