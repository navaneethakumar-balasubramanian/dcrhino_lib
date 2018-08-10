import pandas as pd

def sql_to_panda(db,sql):
    rows_list = []
    for row in  db.select(sql) :
        row_dict = dict()
        for property, value in vars(row).iteritems():
            if property != '_database':
                row_dict[property] = value
        rows_list.append(row_dict)
    return pd.DataFrame(rows_list)
