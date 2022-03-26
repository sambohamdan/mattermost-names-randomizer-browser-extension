class ElementCollection extends Array {
    ready(cb) {
      const isReady = this.some(e => {
        return e.readyState != null && e.readyState != "loading"
      })
      if (isReady) {
        cb()
      } else {
        this.on("DOMContentLoaded", cb)
      }
      return this
    }
  
    on(event, cbOrSelector, cb) {
      if (typeof cbOrSelector === "function") {
        this.forEach(e => e.addEventListener(event, cbOrSelector))
      } else {
        this.forEach(elem => {
          elem.addEventListener(event, e => {
            if (e.target.matches(cbOrSelector)) cb(e)
          })
        })
      }
      return this
    }
  
    removeClass(className) {
      this.forEach(e => e.classList.remove(className))
      return new ElementCollection(...this)
    }
  
    addClass(className) {
      this.forEach(e => e.classList.add(className))
      return new ElementCollection(...this)
    }
  
    css(property, value) {
      const camelProp = property.replace(/(-[a-z])/, g => {
        return g.replace("-", "").toUpperCase()
      })
      this.forEach(e => (e.style[camelProp] = value))
      return this
    }

    find(selector) {
      if (typeof selector === "string" || selector instanceof String) {
        return new ElementCollection(...this[0].querySelectorAll(selector))
      }
    }

    empty() {
      while(this[0].firstChild) this[0].removeChild(this[0].lastChild);
    }
  }
  
  function $(param) {
    if (typeof param === "string" || param instanceof String) {
      return new ElementCollection(...document.querySelectorAll(param))
    } else {
      return new ElementCollection(param)
    }
  }

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  
 