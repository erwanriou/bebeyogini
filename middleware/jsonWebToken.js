const jwt = require("jsonwebtoken")
const keys = require("../config/keys").keys

exports.signToken = (req, res, next) => {
  const payload = {
    id: req.user._id,
    name: req.user.name,
    avatar: req.user.avatar,
    authorities: req.user.authorities
  }
  const token = jwt.sign(
    payload,
    keys.jwt.secret,
    { expiresIn: 7000 },
    (err, token) => {
      const htmlWithEmbeddedJWT = `
        <html>
          <script>
            window.localStorage.setItem('jwtToken', 'Bearer ${token}');
            window.location.href = '/';
          </script>
        </html>
      `
      res.send(htmlWithEmbeddedJWT)
    }
  )
}
