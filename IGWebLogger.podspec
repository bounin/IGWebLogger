Pod::Spec.new do |s|
  s.name     = 'IGWebLogger'
  s.version  = '0.0.1'
  s.summary  = 'IGWebLogger allows you to view your iOS app logs over web browser in realtime.'
  
  s.homepage = 'https://github.com/siuying/IGWebLogger'
  s.author   = { 'Francis Chong' => 'francis@ignition.hk' }
  s.license  = 'MIT'
  s.source   = { :git => 'https://github.com/siuying/IGWebLogger.git', :commit => '2f44f9e27ddb86a061d2c9a75e0bb50626ab0fcf' }
  s.requires_arc = true
  s.platform = :ios, '5.0'
  s.source_files = 'IGWebLogger/Classes/*.{m,h}'
  s.resource = 'IGWebLogger/IGWebLogger.bundle'
  s.dependency "CocoaLumberjack"
end