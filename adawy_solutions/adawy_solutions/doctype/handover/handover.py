# Copyright (c) 2023, InshaSiS Technologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class HandOver(Document):
	pass


# Customer Wise Address Filter
@frappe.whitelist()
def fetch_address(customer):
  address = []  
  raw_add = frappe.db.sql("select parent from `tabDynamic Link` where link_name = %s AND parenttype='Address' AND link_doctype='Customer'", customer)
  for add in raw_add:
       address.append(add[0])
  return address

# Customer Wise Contact Filter
@frappe.whitelist()
def fetch_contact(customer):
  contact = []  
  raw_con = frappe.db.sql("select parent from `tabDynamic Link` where link_name = %s AND parenttype='Contact' AND link_doctype='Customer'", customer)
  for con in raw_con:
       contact.append(con[0])
  return contact