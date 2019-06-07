describe("About Mutability", function() {

  it("should expect object properties to be public and mutable", function () {
    var aPerson = {firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan";
    
    expect(aPerson.firstname).toBe("Alan");
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname  = lastname;
    }
    var aPerson = new Person ("John", "Smith");
    aPerson.firstname = "Alan";
    
    expect(aPerson.firstname).toBe("Alan");
  });

  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    Person.prototype.getFullName = function() {
      return this.firstname + " " + this.lastname;
    };
    
    var aPerson = new Person ("John", "Smith");
    expect(aPerson.getFullName()).toBe("John Smith");
    
    aPerson.getFullName = function() {
      return this.lastname + ", " + this.firstname;
    };
    
    expect(aPerson.getFullName()).toBe("Smith, John");
  });

  it("should know that variables inside a constructor and constructor args are private", function () {
    function Person(firstname, lastname)
    {
      var fullName = firstname + " " + lastname;
      
      this.getFirstName = function() { return firstname; };
      this.getLastName  = function() { return lastname; };
      this.getFullName  = function() { return fullName; };
    }
    var aPerson = new Person ("John", "Smith");//the key: creates a new person using Person
// only thing you created was an object with only methods on it, not even attributes, like firstname, lastname. So your object aPerson is like this:

// {
//     getFirstName: function(), // => John
//     getLastName: function(), // => Smith
//     getFullName: function() // => John Smith
// }

    aPerson.firstname = "Penny";//only updates new Person aPerson
    aPerson.lastname  = "Andrews";
    aPerson.fullName  = "Penny Andrews";

//     {
//     firstname: "Penny", //////new attributes.
//     lastname: "Andrews",
//     fullName: "Penny Andrews",
//     getFirstName: function(), // => John
//     getLastName: function(), // => Smith
//     getFullName: function() // => John Smith
// }
    
    expect(aPerson.getFirstName()).toBe("John");//return what was originally set as firstname for Person, so aPerson
    expect(aPerson.getLastName()).toBe("Smith");
    expect(aPerson.getFullName()).toBe("John Smith");

    aPerson.getFullName = function() { //takes from the new instance of Person(Penny)
      return aPerson.lastname + ", " + aPerson.firstname;
    };
    
    expect(aPerson.getFullName()).toBe("Andrews, Penny");
  });

});
