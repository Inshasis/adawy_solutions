// Copyright (c) 2023, InshaSiS Technologies and Contributors
// See license.txt


frappe.ui.form.on('Quotation', {
	order_type(frm) {
		if(cur_frm.doc.order_type === "Sales"){
		    cur_frm.set_value("selling_price_list","Market Selling (Oman)");
		}
		
		if(cur_frm.doc.order_type === "Rent"){
		    cur_frm.set_value("selling_price_list","Rental Price (Oman)");
		}
		
	},
	selling_price_list(frm) {
		if(cur_frm.doc.selling_price_list === "Market Selling (Oman)"){
		    cur_frm.set_value("order_type","Sales");
		}
		
		if(cur_frm.doc.selling_price_list === "Rental Price (Oman)"){
		    cur_frm.set_value("order_type","Rent");
		}
		
	}
});


// frappe.ui.form.on('Quotation Item', {
//     item_code(frm, cdt, cdn) {
// 	    var item = frappe.get_doc(cdt,cdn);

//         if(item.item_code){
// 		    frappe.db.get_list('Item Price',{ 
//             fields:['price_list_rate'], 
//             filters:{ 
//                 'item_code':item.item_code,
//                 'price_list':"Market Selling (Oman)",
//                 'selling':1
//             } 
//             }).then(function(doc){ 
//                 // console.log(doc);
//                 frappe.model.set_value(cdt,cdn,"custom_market_selling_price",doc[0].price_list_rate);
//             });
// 		}   
// 		// MIT Amount
// 		if(item.item_code){
// 		    frappe.db.get_list('Item Price',{ 
//             fields:['price_list_rate'], 
//             filters:{ 
//                 'item_code':item.item_code,
//                 'price_list':"MIT Selling (Oman)",
//                 'selling':1
//             } 
//             }).then(function(doc){ 
//                 // console.log(doc);
//                 frappe.model.set_value(cdt,cdn,"custom_mit_price",doc[0].price_list_rate);
//                 if(doc.length === 1){
//                     var mit_50_per = doc[0].price_list_rate / 2;
//                     console.log(mit_50_per);
//                     frappe.model.set_value(cdt,cdn,"custom_mit_amount",mit_50_per);

//                     var d = locals[cdt][cdn];
//                     var total = 0;
//                     cur_frm.doc.items.forEach(function(d) {
//                         total += d.custom_mit_amount;
//                     });
//                     // console.log(total)
//                     frm.set_value('custom_mit_total', total );
//                     refresh_field('custom_mit_total');
//                 }
//                 else{
//                     frappe.model.set_value(cdt,cdn,"custom_mit_amount","0.00"); 
//                 }
//             });
// 		}    		
//     },
//     qty(frm, cdt, cdn) {
// 	    var item = frappe.get_doc(cdt,cdn);
// 		// MIT Amount
// 		if(item.item_code){
// 		    frappe.db.get_list('Item Price',{ 
//             fields:['price_list_rate'], 
//             filters:{ 
//                 'item_code':item.item_code,
//                 'price_list':"MIT Selling (Oman)",
//                 'selling':1
//             } 
//             }).then(function(doc){ 
//                 // console.log(doc);
//                 if(doc.length === 1){
//                     var mit_50_per = doc[0].price_list_rate / 2;
//                     var mit_50_per_qty = mit_50_per * item.qty;
//                     frappe.model.set_value(cdt,cdn,"custom_mit_amount",mit_50_per_qty);

//                     var d = locals[cdt][cdn];
//                     var total = 0;
//                     cur_frm.doc.items.forEach(function(d) {
//                         total += d.custom_mit_amount;
//                     });
//                     // console.log(total)
//                     frm.set_value('custom_mit_total', total);
//                     refresh_field('custom_mit_total');
//                 }
//                 else{
//                     frappe.model.set_value(cdt,cdn,"custom_mit_amount","0.00"); 
//                 }
//             });
// 		}
    		
//     },

//     custom_mit_discount_percentage: function(frm, cdt, cdn) {
//         var d = locals[cdt][cdn];
        
//         if(d.custom_mit_discount_type == "MIT Discount Percentage"){
//             var mit_dis_total = d.custom_mit_amount * d.custom_mit_discount_percentage / 100;
//             var total = d.custom_mit_amount - mit_dis_total;
//             frappe.model.set_value(cdt,cdn,"custom_mit_amount",total);


//             var cust_mit_total = cur_frm.doc.custom_mit_total - mit_dis_total;
//             frm.set_value('custom_mit_total', cust_mit_total);
//             refresh_field('custom_mit_total');
            
//         }
//         else{
//             frappe.model.set_value(cdt,cdn,"custom_mit_discount_percentage","0.00"); 
//         }	
//     },

//     custom_mit_discount_amount: function(frm, cdt, cdn) {
//         var d = locals[cdt][cdn];

// 		if(d.custom_mit_discount_type == "MIT Discount Amount"){
// 		    var mit_dis_total = d.custom_mit_amount - d.custom_mit_discount_amount;
//             frappe.model.set_value(cdt,cdn,"custom_mit_amount",mit_dis_total);

//             //doctype changes
//             var cust_mit_tot = cur_frm.doc.custom_mit_total - mit_dis_total;
//             frm.set_value('custom_mit_total', cust_mit_tot);
//             refresh_field('custom_mit_total');
            
// 		}
//         else{
//             frappe.model.set_value(cdt,cdn,"custom_mit_discount_amount","0.00"); 
//         }
// 	},

//     items_remove: function(frm, cdt, cdn) {
//         var d = frappe.get_doc(cdt,cdn);
// 	    var d = locals[cdt][cdn];
//         var total = 0;
//         cur_frm.doc.items.forEach(function(d) {
//             total += d.custom_mit_amount;
//         });
//         // console.log(total)
//             if(d.custom_mit_discount_type == "MIT Discount Percentage"){
//                 var mit_dis_total = d.custom_mit_amount * d.custom_mit_discount_percentage / 100;
//                 var total = d.custom_mit_amount - mit_dis_total;
//                 frappe.model.set_value(cdt,cdn,"custom_mit_amount",total);
    
    
//                 var cust_mit_total = cur_frm.doc.custom_mit_total - mit_dis_total;
//                 frm.set_value('custom_mit_total', cust_mit_total);
//                 refresh_field('custom_mit_total');
                
//             }
//             else if(d.custom_mit_discount_type == "MIT Discount Amount"){
//                 var mit_dis_total = d.custom_mit_amount - d.custom_mit_discount_amount;
//                 frappe.model.set_value(cdt,cdn,"custom_mit_amount",mit_dis_total);
    
//                 //doctype changes
//                 var cust_mit_tot = cur_frm.doc.custom_mit_total - mit_dis_total;
//                 frm.set_value('custom_mit_total', cust_mit_tot);
//                 refresh_field('custom_mit_total');
                
//             }
//             else{
//                     frappe.model.set_value(cdt,cdn,"custom_mit_discount_percentage","0.00"); 
//                     frappe.model.set_value(cdt,cdn,"custom_mit_discount_amount","0.00");
                
//             }     
//     },
//  	custom_price_list(frm, cdt, cdn) {
// 	    var item = frappe.get_doc(cdt,cdn);
	    
// 		// Item Price Price List Wise Rate 
// 		if(item.custom_price_list){
// 		    frappe.db.get_list('Item Price',{ 
//             fields:['price_list_rate'], 
//             filters:{ 
//                 'item_code':item.item_code,
//                 'price_list':item.custom_price_list,
//                 'selling':1
//             } 
//             }).then(function(doc){ 
//                 // console.log(doc);
//                 if(doc.length === 1){
//                     frappe.model.set_value(cdt,cdn,"rate",doc[0].price_list_rate);
//                 }
//                 else{
//                     frappe.model.set_value(cdt,cdn,"rate","0.00"); 
//                 }
//             });
		   
// 		}		
//     }
// });

// frappe.ui.form.on('Quotation',  {
//     validate: function(frm) {
//         var tbl = frm.doc.items || [];
//         var i = tbl.length;
//         while (i--) {
//             if(frm.doc.items[i].item_code == "ICFL") {
//             cur_frm.get_field("items").grid.grid_rows[i].remove();
//             frm.refresh_field("items");
//             }  
//         }
        
//         // ICFL (Installation, Configuration, Fixing and License)
//         if(cur_frm.doc.custom_mit_total && cur_frm.doc.selling_price_list === "Rental Price (Oman)"){
//         let entry = frm.add_child("items");
//         entry.item_code = "ICFL";
//         entry.item_name = "Installation, Configuration, Fixing and License";
//         entry.description = "Installation, Configuration, Fixing and License";
//         entry.delivery_date = cur_frm.doc.delivery_date;
//         entry.uom = "Nos";
//         entry.qty = "1";
//         entry.rate = cur_frm.doc.custom_mit_total ;
//         refresh_field("items") ;
//         }
//     },
//     custom_mit_discount_percentage: function(frm) {
// 		if(cur_frm.doc.custom_mit_discount_type == "MIT Discount Percentage"){
// 		    var mit_dis_total = cur_frm.doc.custom_mit_total * cur_frm.doc.custom_mit_discount_percentage /100;
// 		    var total = cur_frm.doc.custom_mit_total - mit_dis_total;
		    
// 		    cur_frm.set_value('custom_mit_total',total);
		    
// 		}
// 	},
// 	custom_mit_discount_amount: function(frm) {
// 		if(cur_frm.doc.custom_mit_discount_type == "MIT Discount Amount"){
		    
// 		    var mit_dis_total = cur_frm.doc.custom_mit_total - cur_frm.doc.custom_mit_discount_amount;
// 		    cur_frm.set_value('custom_mit_total',mit_dis_total);
// 		}
// 	}
// });
