require 'net/https'

$domain = 'jabbify.com'
$ssl = true
$port = 8443

## https://jabbify.com:8443/message_push?key=123456&name=Neo&type=message&action=create&message=sweet

class Jabbify
  def self.send(params)
    if params[:key]
      key = params[:key]
    else
      key = ""
    end
    if params[:name]
      name = params[:name]
    else
      name = "The Matrix"
    end
    if params[:type]
      type = params[:type]
    else
      type = "message"
    end
    if params[:action]
      action = params[:action]
    else
      action = "create"
    end
    if params[:message]
      message = params[:message]
    else
      throw "message is required"
    end
    if params[:to]
      to = params[:to]
    end
    d = {
      "key" => key,
      "name" => name,
      "type" => type,
      "action" => action,
      "message" => message
    }
    d["to"] = to if to
    response, data = Requestor.post($domain, $port, "/message_push",  d, $ssl, 150 )
    p data
  end
end

class Requestor
  def self.domain
    @domain
  end
  
  def self.domain=(p)
    @domain  = p
  end
  
  def self.port
    @port
  end
  
  def self.port=(p)
    @port  = p
  end
  
  def self.params_to_path(params)
    parts = [];
    params.each {|key, value|
        parts.push(key.to_s+"="+     URI.escape(value.to_s, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]")))
    }
    parts.join('&')
  end
  
  def self.get_http(root, p, ssl = false, timeout = 5)
    root = root || domain
    p = p || port
    
    http = Net::HTTP.new(root, p)
    
    http.read_timeout = timeout
      
    if ssl
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
        store = OpenSSL::X509::Store.new
        store.set_default_paths
        http.cert_store = store
    end
    http
  end
  
  def self.get(root, p, path,  params = nil, ssl = false, timeout = 5 )
      http = get_http(root, p, ssl, timeout)
      

      path = path+ "?" + params_to_path(params || {} )
      p path
      http.get(path)
  end

  def self.post(root, p, path,  params = nil, ssl = false, timeout = 5)
      http = get_http(root, p, ssl, timeout)
      
      data = params_to_path(params || {} )
      http.post(path, data)
  end
end