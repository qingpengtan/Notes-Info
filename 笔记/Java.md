####注解

######注解分类

源码注解、编译注解、运行注解、元注解、自定义注解

######自定义注解

######解析注解




####基于Token的登录

````java

    //（1）使用JWT的包：maven导入
    <!--JSON WEB TOKEN -->
    <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt</artifactId>
      <version>0.6.0</version>
    </dependency>
    
    
//    （2）一个生成token的工具类：
    public class JavaWebToken {
    
        private static Logger log = Logger.getLogger(JavaWebToken.class);
    
        private static Key getKeyInstance() {
            SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
            byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary("APP");
            Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
            return signingKey;
        }
    
        public static String createJavaWebToken(Map<String, Object> claims) {
            return Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS256, getKeyInstance()).compact();
        }
    
        public static Map<String, Object> verifyJavaWebToken(String jwt) {
            try {
    
                Map<String, Object> jwtClaims =
                        Jwts.parser().setSigningKey(getKeyInstance()).parseClaimsJws(jwt).getBody();
                return jwtClaims;
            } catch (Exception e) {
                log.error("json web token verify failed");
                return null;
            }
        }
    
    }
    
    
//    （3）一个从request拿去session，并且解密session得到token得到用户id的类
    public class AuthUtil {
        private static Map<String, Object> getClientLoginInfo(HttpServletRequest request) throws Exception {
            Map<String, Object> r = new HashMap<>();
            String sessionId = request.getHeader("sessionId");
            if (sessionId != null) {
                r = decodeSession(sessionId);
                return r;
            }
            throw new Exception("session解析错误");
        }
    
        public static Long getUserId(HttpServletRequest request) throws Exception {
            return  Long.valueOf((Integer)getClientLoginInfo(request).get("userId"));
    
        }
    
        /**
         * session解密
         */
        public static Map<String, Object> decodeSession(String sessionId) {
            try {
                return verifyJavaWebToken(sessionId);
            } catch (Exception e) {
                System.err.println("");
                return null;
            }
        }
    }
    
    
    //登录
        @RequestMapping(value = "/login", method = {RequestMethod.GET, RequestMethod.POST}, produces = "text/html;charset=UTF-8")
        public String login(String account) {
            User user = userService.login(account);
    
            DTO dto = new DTO();
            if (user == null) {
                dto.code = "-1";
                dto.msg = "Have not registered";
            } else {
                //把用户登录信息放进Session
                Map<String, Object> loginInfo = new HashMap<>();
                loginInfo.put("userId", user.getId());
                String sessionId = JavaWebToken.createJavaWebToken(loginInfo);
                System.out.println("sessionID"+sessionId);
                dto.data = sessionId;
            }
            return JSON.toJSONString(dto);
        }
        
        
        
        //修改昵称
        @RequestMapping(value = "/updateName", method = {RequestMethod.GET, RequestMethod.POST})
        public String updateName(HttpServletRequest request, String name) {
            DTO dto = new DTO();
            try {
            //从session拿到token，再解密得到userid
                Long userId = AuthUtil.getUserId(request);
                boolean userIsExist = userService.updateName(userId, name);
                if (userIsExist == false) {
                    dto.code = "-1";
                    dto.msg = "Have not updateAvatar";
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return JSON.toJSONString(dto);
        }
    
    



````