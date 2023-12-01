# Copyright (c) 2023, hidayatali and contributors
# For license information, please see license.txt

import frappe

# @frappe.whitelist() 
# def fetch_item_group(item_group):
# 	items = frappe.db.sql(" select name from `tabItem` where item_group='{item_group}'",as_dict=1)
# 	return items


@frappe.whitelist()
def fetch_item_group(item_group):
  items = []  
  scrapitems = frappe.db.sql("select name from `tabItem` where item_group = %s", item_group)
  for item in scrapitems:
      items.append(item[0])    

  return items

