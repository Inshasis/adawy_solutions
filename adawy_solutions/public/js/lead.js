// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on("Lead", "refresh", function(frm) {
    frm.add_custom_button(__("Create Address"), function() {
            frappe.prompt([
        {
            label: 'Address Title',
            fieldname: 'address_title',
            fieldtype: 'Data',
            reqd:1
        },
        {
            label: 'Address Type',
            fieldname:'address_type',
            fieldtype:'Select',
            reqd:1,
            options:['Billing','Shipping','Office','Personal','Plant','Postal','Shop','Subsidiary','Warehouse','Current','Permanent','Other']
        },
        {
            label: 'Address Line',
            fieldname: 'address_line',
            fieldtype: 'Data',
            reqd:1
        },
        {
            label: 'Province',
            fieldname: 'province',
            fieldtype: 'Link',
            options: 'Province',
            reqd:1
        },
        {
            label: 'City',
            fieldname: 'city',
            fieldtype: 'Link',
            options: 'City',
            reqd:1
        },
        {
            label: 'Area',
            fieldname: 'area',
            fieldtype: 'Link',
            options: 'Area',
        }
        ], (values) => {
            let row = [];
            row.push({
                "link_doctype":"Lead",
                "link_name":cur_frm.doc.name,
            });
            frappe.db.insert({
                "doctype":"Address",
                "address_title":values.address_title,
                "address_type":values.address_type,
                "address_line1":values.address_line,
                "state":values.province,
                "city":values.city,
                "links":row
                
            }).then(function(doc){
                frappe.msgprint("New Address Created.");
            });
        });
    });
});
