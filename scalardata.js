
let _id = 1;
class Id {

  static next() {
	return _id++;
  }
  
  static set(value) {
	_id = value;
  }

  static toJSON() {
	return _id;
  }
}

sd = {
  boot: function() {
	// Find data and load it
	if (window.data instanceof Array) {
	  Id.set(window.data[0]);
	  this.schemas = new Schemas(window.data[1]);
	} else {
	  this.schemas = new Schemas([Id.next(),[]]);
	}

	// Reference elements
	this.workspace = new Workspace(document.getElementById('workspace'));
	this.schemasView = new SchemasView(this.schemas, this.workspace);
	this.schemasView.render(document.getElementById('schemas'));
  },

  export: function() {
	var json = new Array();
	json.push(Id.toJSON());
	json.push(this.schemas.toJSON());

	console.log(JSON.stringify(json));
  }
}

window.addEventListener('load', (e) => sd.boot());
