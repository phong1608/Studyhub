const removeUndefinedObject = obj=>{
  Object.keys(obj).forEach(k=>{
      if(obj[k]==null)
          {
              delete obj[k]
          }
  })
  return obj

}


export {removeUndefinedObject}
